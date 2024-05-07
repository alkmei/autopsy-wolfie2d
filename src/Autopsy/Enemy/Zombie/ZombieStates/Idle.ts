import ZombieState from "./ZombieState";
import { ZState } from "../ZombieController";
import { ZombieAnimations } from "../Zombie";
import Vec2 from "@/Wolfie2D/DataTypes/Vec2";

export default class Idle extends ZombieState {
  onEnter(options: Record<string, any>) {
    //this.parent.direction = this.parent.randomDirection();
    this.stateName = "Idle";
    if(!this.owner.animation.isPlaying(ZombieAnimations.Hurt) && !this.owner.animation.isPlaying(ZombieAnimations.Attacking)){
      this.owner.animation.playIfNotAlready(ZombieAnimations.Idle,true);
    }
    else{
      this.owner.animation.queue(ZombieAnimations.Idle,true);
    }
    this.idleTimer.start();
    
  }

  update(deltaT: number) {
    super.update(deltaT);

    //if (this.withinXBlock(6)) this.canFollow = true;

    //if (this.canFollow) {
      //this.finished(ZState.Following);
    //} else {
      //this.parent.velocity.x =
        //this.parent.direction.x * this.parent.driftSpeed * deltaT;
      //this.parent.velocity.y =
        //this.parent.direction.y * this.parent.driftSpeed * deltaT;

      //this.owner.move(this.parent.velocity);
    //}
    //if(!this.owner.onGround){
        //this.parent.velocity.x =0;
        //this.parent.velocity.y =
            //this.parent.gravity * deltaT;
        
        //this.owner.move(this.parent.velocity);
        //console.log("not on ground");
        
        //this.parent.tilemap.getTileAtWorldPosition(new Vec2(this.owner.position.x+this.owner.s, this.owner.position.y))
    //}
    if(!this.owner.animation.isPlaying(ZombieAnimations.Hurt) && !this.owner.animation.isPlaying(ZombieAnimations.Attacking)){
      this.owner.animation.playIfNotAlready(ZombieAnimations.Idle,true);
    }
    else{
      this.owner.animation.queue(ZombieAnimations.Idle,true);
    }

    if(this.idleTimer.isStopped() && this.owner.onGround){
        this.finished(ZState.Walking);
        
    }
    this.parent.velocity.x =0;
    this.parent.velocity.y =
        this.parent.gravity * deltaT;
        
    this.owner.move(this.parent.velocity);
  }

  onExit(): Record<string, any> {
    //(<AnimatedSprite>this.owner).animation.stop();
    return {};
  }
}
