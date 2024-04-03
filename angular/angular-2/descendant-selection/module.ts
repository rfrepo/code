import { NgModule } from "@angular/core";
import { SizeObserverDirective } from "./size-observer.directive";
import { SizeWatcherDirective } from "./size-watcher.directive";
import { DescendantSelection } from "./descendant-selection";

@NgModule({
    declarations: [SizeObserverDirective, SizeWatcherDirective, DescendantSelection],
    exports: [SizeObserverDirective, SizeWatcherDirective, DescendantSelection],
})
export class DescendantSelectorModule {
}