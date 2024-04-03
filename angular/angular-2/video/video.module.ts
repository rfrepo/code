/* tslint:disable:max-line-length */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import VideoAssetComponent from './video-asset/video-asset.component';
import VideoPosterComponent from './video-poster/video-poster.component';
import VideoPlayerComponent from './video-player/video-player.component';
import {VideoPlayerService} from '../../services/video-player/video-player.service';
import {SingleVideoPlayoutEnforcementService} from '../../services/video-player/single-video-playout.service';

/* tslint:enable:max-line-length */

@NgModule({
  exports: getClasses(),
  imports: [CommonModule],
  declarations: getClasses(),
  providers: [SingleVideoPlayoutEnforcementService, VideoPlayerService],
})

export class VideoModule {
}

function getClasses() {
  return [
    VideoAssetComponent,
    VideoPlayerComponent,
    VideoPosterComponent,
  ];
}
