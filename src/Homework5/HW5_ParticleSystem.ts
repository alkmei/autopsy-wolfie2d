import Particle from "../Wolfie2D/Nodes/Graphics/Particle";
import ParticleSystem from "../Wolfie2D/Rendering/Animations/ParticleSystem";
import { EaseFunctionType } from "../Wolfie2D/Utils/EaseFunctions";
import RandUtils from "../Wolfie2D/Utils/RandUtils";
import Color from "../Wolfie2D/Utils/Color";
import Vec2 from "../Wolfie2D/DataTypes/Vec2";
import { HW5_Color } from "./hw5_color";

// HOMEWORK 5 - DONE
/**
 * This particle system extends the base ParticleSystem class, and I reccommend you look at some of the implementation,
 * at least for the default setParticleAnimation()
 *
 * You'll just be handling the tweens for each particle for their animation, overriding the base implementation.
 *
 * The new particle animation add these behaviors, along with the existing setParticleAnimation behaviors:
 *
 *  - Each particle should look like they're affected by gravity, accelerating down over the course of their lifetime. This
 *  change should also be affected by the particle's mass, meaning particles with a higher mass should fall faster.
 *
 *  - Each particle should disappear over it's lifetime, moving from an alpha of 1 to 0.
 */
export default class HW5_ParticleSystem extends ParticleSystem {
    startSystem(
        time: number,
        mass?: number,
        startPoint?: Vec2,
        color?: HW5_Color,
    ) {
        super.startSystem(time, mass, startPoint);
        switch (color) {
            case HW5_Color.RED:
                this.changeColor(Color.RED);
                break;
            case HW5_Color.GREEN:
                this.changeColor(Color.GREEN);
                break;
            case HW5_Color.BLUE:
                this.changeColor(Color.BLUE);
                break;
            default:
                break;
        }
    }

    setParticleAnimation(particle: Particle) {
        particle.vel = RandUtils.randVec(-50, 50, -100, 100);
        particle.tweens.add("active", {
            startDelay: 0,
            duration: this.lifetime,
            effects: [
                {
                    property: "alpha",
                    start: 1,
                    end: 0,
                    ease: EaseFunctionType.IN_OUT_QUAD,
                },
            ],
        });
    }

    update(deltaT: number) {
        super.update(deltaT);

        for (let i = 0; i < this.particlesToRender; i++) {
            const particle = this.particlePool[i];
            if (particle.inUse) particle.vel.y += 98 * deltaT * particle.mass;
        }
    }
}
