/**
 * no-courier-constants
 * Cohesion / colocation (docs/clean-code.md §2): a domain lookup map (an object
 * literal read only as `MAP[key]`) whose reads all render into exactly ONE child
 * component belongs with that consumer — extract a variation that owns it
 * (e.g. AllocationStatusChip owns its own tone/label maps), never leave it in
 * the composing page/parent.
 *
 * Only fires when the map lives in a COMPOSITION — a component that renders
 * other components besides the one the map feeds. A dedicated variation (whose
 * only child component IS the map's target, e.g. PublicationStatusChip →
 * StatusChip) is the correct home and is NOT flagged.
 *
 * Reports the SMELL only. The fix is a judgment: if the target child is a shared
 * wrapper (StatusChip), extract a domain variation rather than pushing the map
 * into the wrapper. Advisory (`warn`), never a blocker.
 *
 * Exempt: single-entry objects, maps read in the component's own logic, maps
 * feeding a host element or more than one child, maps shared across components,
 * `// hoisted:` comments.
 */

const MIN_MAP_ENTRIES = 2;
const COMPONENT_NAME = /^[A-Z]/;

const elementNameOf = (openingElement) => {
  const { name } = openingElement;
  if (name.type === 'JSXIdentifier') return name.name;
  if (name.type === 'JSXMemberExpression') {
    const parts = [];
    let current = name;
    while (current.type === 'JSXMemberExpression') {
      parts.unshift(current.property.name);
      current = current.object;
    }
    parts.unshift(current.name);
    return parts.join('.');
  }
  return null;
};

const nameOrHost = (name) => {
  if (!name) return null;
  return /^[a-z]/.test(name) ? 'host' : name;
};

/** Walk up from a reference; return the name of the JSX element it renders into
 * — the element that owns the attribute (prop position) OR the element it is a
 * child of (children position) — 'host' for a lowercase element, or null when
 * the reference is used outside JSX (the component's own logic). */
const nearestJsxElement = (identifier) => {
  let node = identifier;
  while (node.parent) {
    const { parent } = node;
    if (parent.type === 'JSXAttribute' || parent.type === 'JSXSpreadAttribute') {
      const opening = parent.parent;
      if (opening && opening.type === 'JSXOpeningElement') return nameOrHost(elementNameOf(opening));
      return null;
    }
    if (parent.type === 'JSXExpressionContainer' && parent.parent) {
      if (parent.parent.type === 'JSXElement') {
        return nameOrHost(elementNameOf(parent.parent.openingElement));
      }
      if (parent.parent.type === 'JSXFragment') return null; // no owning element
    }
    if (
      parent.type === 'FunctionDeclaration' ||
      parent.type === 'FunctionExpression' ||
      parent.type === 'ArrowFunctionExpression' ||
      parent.type === 'Program'
    ) {
      return null;
    }
    node = parent;
  }
  return null;
};

const isLookupRead = (identifier) => {
  const { parent } = identifier;
  return (
    parent &&
    parent.type === 'MemberExpression' &&
    parent.computed === true &&
    parent.object === identifier
  );
};

/** The nearest enclosing function that is a component — an arrow/function bound
 * to a Capitalized name, or a Capitalized function declaration. Skips inline
 * render callbacks (e.g. `rows.map(row => ...)`), whose parent is a call. */
const enclosingComponent = (identifier) => {
  let node = identifier.parent;
  while (node) {
    if (
      (node.type === 'ArrowFunctionExpression' || node.type === 'FunctionExpression') &&
      node.parent &&
      node.parent.type === 'VariableDeclarator' &&
      node.parent.id &&
      node.parent.id.type === 'Identifier' &&
      COMPONENT_NAME.test(node.parent.id.name)
    ) {
      return node;
    }
    if (node.type === 'FunctionDeclaration' && node.id && COMPONENT_NAME.test(node.id.name)) {
      return node;
    }
    node = node.parent;
  }
  return null;
};

/** All distinct component-cased JSX element names rendered anywhere inside a node. */
const componentElementNames = (root) => {
  const names = new Set();
  const visit = (n) => {
    if (!n || typeof n.type !== 'string') return;
    if (n.type === 'JSXOpeningElement') {
      const name = elementNameOf(n);
      if (name && COMPONENT_NAME.test(name)) names.add(name);
    }
    for (const key of Object.keys(n)) {
      if (key === 'parent') continue;
      const value = n[key];
      if (Array.isArray(value)) value.forEach(visit);
      else if (value && typeof value.type === 'string') visit(value);
    }
  };
  visit(root);
  return names;
};

const hasHoistedComment = (sourceCode, node) => {
  const comments = [
    ...(sourceCode.getCommentsBefore(node) || []),
    ...sourceCode.getAllComments().filter((c) => c.loc.start.line === node.loc.start.line),
  ];
  return comments.some((c) => /hoisted:/.test(c.value));
};

export default {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Domain lookup maps read only to render one child of a larger composition belong with that consumer (colocation)',
    },
    schema: [],
    messages: {
      courier:
        "'{{map}}' is only read to render <{{child}}> — colocate it with its consumer by extracting a <{{child}}> variation that owns it (e.g. AllocationStatusChip), docs/clean-code.md §2. Suppress with `// hoisted: <reason>` if this map is intentionally shared here.",
    },
  },
  create(context) {
    const sourceCode = context.sourceCode ?? context.getSourceCode();
    return {
      VariableDeclarator(node) {
        if (!node.init || node.init.type !== 'ObjectExpression') return;
        if (node.init.properties.length < MIN_MAP_ENTRIES) return;
        if (node.id.type !== 'Identifier') return;

        const declaration = node.parent;
        if (hasHoistedComment(sourceCode, declaration)) return;

        const variables = sourceCode.getDeclaredVariables
          ? sourceCode.getDeclaredVariables(node)
          : context.getDeclaredVariables(node);

        const readReferences = variables
          .flatMap((variable) => variable.references)
          .filter((reference) => reference.isRead());

        if (readReferences.length === 0) return;

        const targets = new Set();
        const components = new Set();
        for (const reference of readReferences) {
          // Only a map read purely as `MAP[key]` counts as a lookup. Any other
          // use (spread, whole-object pass, logic) means it is not a courier.
          if (!isLookupRead(reference.identifier)) return;
          const target = nearestJsxElement(reference.identifier);
          if (target === null || target === 'host') return; // own logic / DOM usage
          targets.add(target);
          const component = enclosingComponent(reference.identifier);
          if (!component) return; // can't judge the surrounding component
          components.add(component);
        }

        // Couriered means: read into exactly one child, from exactly one component.
        if (targets.size !== 1 || components.size !== 1) return;

        const [child] = targets;
        const [component] = components;
        const rendered = componentElementNames(component);
        // A dedicated variation renders only its one target child → correct home.
        // A composition renders other components too → the map has been couriered.
        if (rendered.size <= 1) return;

        context.report({ node, messageId: 'courier', data: { map: node.id.name, child } });
      },
    };
  },
};
