import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DescendantSelectorModule } from "./lab/descendant-selection/module";
import { TemplateTestComponent } from './lab/template-test/template-test.component';
import { TemplateeComponent } from './lab/template-test/templatee/templatee.component';
import { TrackerDirective } from './lab/template-test/tracker/tracker.directive';

@NgModule({
    declarations: [
        AppComponent,
        TemplateTestComponent,
        TemplateeComponent,
        TrackerDirective
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        DescendantSelectorModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
