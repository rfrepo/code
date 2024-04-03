import YT from 'youtube-iframe-api';
import {EventEmitter, Injectable} from '@angular/core';
import {VideoPlayerInstanceProxy} from './video-player-instance-proxy';
import WindowService from '../window.service';


@Injectable()
export class VideoPlayerService {
  private isRegisteredForYouTubeApiReady: boolean = false;

  private pendingAssignments: Array<any> = [];

  private playerInstanceVOs: Array<Object> = [];

  private playerInstanceCreatedEmitter: EventEmitter<VideoPlayerInstanceProxy>
    = new EventEmitter<VideoPlayerInstanceProxy>();

  constructor(private windowService: WindowService) {
    this.removePlayerInstance = this.removePlayerInstance.bind(this);
    this.dealWithPendingAssignments =
      this.dealWithPendingAssignments.bind(this);
  }

  createPlayerInstance(config) {
    const videoPlayerInstanceProxy =
      this.createVideoPlayerInstanceProxy(config);

    const youTubePlayerInstance = this.createYouTubePlayerInstance(config);

    if (youTubePlayerInstance) {
      videoPlayerInstanceProxy.setInstance(youTubePlayerInstance);
    }
    else {
      this.deferPlayerCreation({videoPlayerInstanceProxy, config});
    }

    return videoPlayerInstanceProxy;
  }

  createYouTubePlayerInstance(
    {width, height, videoId, playerInstanceId, events}): void {
    let youTubePlayer: any = null;

    if (YT.loaded) {
      // tslint:disable-next-line variable-name
      const YouTubePlayer = this.windowService.nativeWindow.YT.Player;

      youTubePlayer =
        new YouTubePlayer(playerInstanceId, {width, height, videoId, events});
    }

    return youTubePlayer;
  }

  dealWithPendingAssignments(): void {
    for (const {videoPlayerInstanceProxy, config} of this.pendingAssignments) {
      const youTubePlayerInstance = this.createYouTubePlayerInstance(config);

      videoPlayerInstanceProxy.setInstance(youTubePlayerInstance);
    }
  }

  subscribeToVideoPlayerInstanceProxy(
    videoPlayerInstanceProxy: VideoPlayerInstanceProxy): void {
    videoPlayerInstanceProxy.getDestroyedEmitter()
      .subscribe(this.removePlayerInstance);
  }

  getPlayerInstanceCreatedEmitter(): EventEmitter<VideoPlayerInstanceProxy> {
    return this.playerInstanceCreatedEmitter;
  }

  removePlayerInstance(playerInstanceToRemove: VideoPlayerInstanceProxy): void {
    this.playerInstanceVOs =
      this.playerInstanceVOs.filter((playerInstanceVO: any) => {
        return playerInstanceVO !== playerInstanceToRemove;
      });
  }

  getPlayerInstanceVOs() {
    return this.playerInstanceVOs;
  }

  private createVideoPlayerInstanceProxy(config: any) {
    const videoPlayerInstanceProxy = new VideoPlayerInstanceProxy(config);

    this.subscribeToVideoPlayerInstanceProxy(videoPlayerInstanceProxy);

    this.updateConfigEventsWithProxyCallbacks({
      videoPlayerInstanceProxy,
      config,
    });

    this.playerInstanceVOs.push(videoPlayerInstanceProxy);

    this.playerInstanceCreatedEmitter.emit(videoPlayerInstanceProxy);

    return videoPlayerInstanceProxy;
  }

  private updateConfigEventsWithProxyCallbacks(
    {videoPlayerInstanceProxy, config}): void {
    const {
      emitReady: onReady,
      emitStateChange: onStateChange,
    } = videoPlayerInstanceProxy;

    config.events = {onReady, onStateChange};
  }

  private deferPlayerCreation({videoPlayerInstanceProxy, config}): void {
    if (!this.isRegisteredForYouTubeApiReady) {

      this.pendingAssignments.push({videoPlayerInstanceProxy, config});

      this.windowService.nativeWindow.onYouTubeIframeAPIReady =
        this.dealWithPendingAssignments;

      this.isRegisteredForYouTubeApiReady = true;
    }
    else if (YT.loading) {
      this.pendingAssignments.push({videoPlayerInstanceProxy, config});
    }
    else if (!YT.loading && !YT.loaded && this.isRegisteredForYouTubeApiReady) {
      console.log('youtube failed to load!');
    }
  }
}
