import { ZombieAnimations } from "../Zombie";
import { ZState } from "../ZombieController";
import ZombieState from "./ZombieState";
import AnimatedSprite from "@/Wolfie2D/Nodes/Sprites/AnimatedSprite";


export default class Walking extends ZombieState{
    justEnter: boolean;

    onEnter(options: Record<string, any>): void {
        this.parent.direction.x *= -1;
        (<AnimatedSprite>this.owner).invertX = !(<AnimatedSprite>this.owner)
        .invertX;
        this.owner.animation.playIfNotAlready(ZombieAnimations.Walking,true);
        this.justEnter = true;
    }

    update(deltaT: number): void {
        super.update(deltaT);
        
        this.parent.velocity.x =
            this.parent.direction.x * this.parent.speed * deltaT;
        this.parent.velocity.y =
            this.parent.gravity * deltaT;
        
        if(this.parent.direction.x === 1){
            if(this.onCliffRight() || this.owner.onWall){
                this.finished(ZState.Idle);
                return;
            }
        }
        else if(this.parent.direction.x === -1){
            if(this.onCliffLeft() || this.owner.onWall){
                this.finished(ZState.Idle);
                return;
            }
        }

        this.owner.move(this.parent.velocity);
        
    }

    onExit(): Record<string, any> {
        return {};
    }
}

