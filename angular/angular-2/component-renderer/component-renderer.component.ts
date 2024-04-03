import {
  ViewChild, OnChanges, OnInit, OnDestroy,
  Component, ComponentRef, Input, ViewContainerRef, ComponentFactoryResolver
} from '@angular/core';

@Component({
  selector: 'app-component-renderer',
  template: `<div #dynamicTarget></div>`,
})
export default class ComponentRendererComponent implements OnChanges, OnInit, OnDestroy {

  @Input()
  public configurationVO: Object;

  private componentReference: ComponentRef<any>;

  private isViewInitialized = false;

  @ViewChild('dynamicTarget', { read: ViewContainerRef })
  private dynamicTarget: any;

  constructor(private resolver: ComponentFactoryResolver) {
  }

  ngOnChanges() {
    this.updateComponent();
  }

  ngOnInit() {
    this.isViewInitialized = true;
    this.updateComponent();
  }

  ngOnDestroy() {
    if (this.componentReference) {
      this.componentReference.destroy();
    }
  }

  private updateComponent() {
    if (!this.isViewInitialized) {
      return;
    }

    if (this.componentReference) {
      this.componentReference.destroy();
    }

    const { componentClass, componentData }: any = this.configurationVO;

    let componentFactory = this.resolver.resolveComponentFactory(componentClass);
    this.componentReference = this.dynamicTarget.createComponent(componentFactory);
    this.componentReference.instance.data = componentData;
  }
}
