import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MsSpinnerInlineDot} from './inline-dot/inline-dot';

@NgModule({
  imports: [CommonModule],
  declarations: [MsSpinnerInlineDot],
  exports: [MsSpinnerInlineDot]
})
export class MsSpinnerModule {
}
