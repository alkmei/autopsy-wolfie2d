import GameLevel, { Layers } from "../GameLevel";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import SpiderBoss from "@/Autopsy/Enemy/SpiderBoss/SpiderBoss";
import Spider from "@/Autopsy/Enemy/Spider/Spider";
import Ghost, { GhostType } from "@/Autopsy/Enemy/Ghost/Ghost";
import { GameEventType } from "@/Wolfie2D/Events/GameEventType";
import Monolith from "@/Autopsy/Enemy/Monolith/Monolith";
import Label from "@/Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "@/Wolfie2D/Nodes/UIElements/UIElementTypes";
import Color from "@/Wolfie2D/Utils/Color";
import { Events } from "@/globals";
import GameEvent from "@/Wolfie2D/Events/GameEvent";
import MainMenu from "../MainMenu";
import LanternCorpse from "@/Autopsy/Enemy/LanternCorpse";
import { SpiderBossEvents } from "@/Autopsy/Enemy/SpiderBoss/SpiderBossController";
import Rect from "@/Wolfie2D/Nodes/Graphics/Rect";
import { GraphicType } from "@/Wolfie2D/Nodes/Graphics/GraphicTypes";
import Timer from "@/Wolfie2D/Timing/Timer";
import Hitbox, { HType } from "@/Autopsy/Hitbox/Hitbox";
import { DamageType } from "@/Autopsy/Hitbox/DamageType";
import Congratulations from "../Congratulations";

export default class Level6 extends GameLevel {
  bossHealthBar: Label;
  bossHealthBarBg: Label;
  phase: number;
  triggeredBoss: boolean;

  boss: SpiderBoss;
  lantern: LanternCorpse;
  projTimer: Timer;
  projSpeed: number;

  loadScene() {
    super.loadScene();
    this.load.tilemap("tilemap", "assets/tilemaps/Level3/Level3.json");

    this.load.spritesheet(
      "RedSoul",
      "assets/spritesheets/RedSoul/RedSoul.json",
    );

    this.load.spritesheet(
      "Monolith",
      "assets/spritesheets/Monolith/Monolith.json",
    );

    this.load.spritesheet("Spider", "assets/spritesheets/Spider/Spider.json");
    this.load.spritesheet(
      "SpiderBoss",
      "assets/spritesheets/SpiderBoss/SpiderBoss.json",
    );

    this.load.spritesheet(
      "WebProjectile",
      "assets/spritesheets/WebProjectile/WebProjectile.json",
    );
    this.load.spritesheet(
      "LanternCorpse",
      "assets/spritesheets/LanternCorpse/LanternCorpse.json",
    );

    this.load.audio("bluddington", "assets/music/weird.wav");
  }

  startScene() {
    super.startScene();
    this.player.node.position = new Vec2(150, 250);
    this.camera.node.position = this.player.node.position.clone();
    this.add.tilemap("tilemap", new Vec2(1, 1));
    this.viewport.setBounds(0, 0, 2048, 1280);

    this.triggeredBoss = false;
    this.phase = 1;

    this.projTimer = new Timer(
      2500,
      () => {
        this.spawnProjectiles();
      },
      true,
    );
    this.projSpeed = 270;

    this.initializeMonoliths();
  }

  unloadScene() {
    this.emitter.fireEvent(GameEventType.STOP_SOUND, { key: "bluddington" });
    super.unloadScene();
  }

  update(deltaT: number): void {
    super.update(deltaT);
    if (!this.triggeredBoss && this.player.node.position.x > 704) {
      this.triggeredBoss = true;
      this.spawnBoss();
      this.initPhase(this.phase); // Phase 1
      this.initBossHp();

      this.emitter.fireEvent(GameEventType.PLAY_MUSIC, {
        key: "bluddington",
        loop: true,
        holdReference: true,
      });

      const blocker = <Rect>this.add.graphic(GraphicType.RECT, Layers.Main, {
        position: new Vec2(665, 272),
        size: new Vec2(50, 160),
      });
      blocker.color = new Color(66, 70, 99, 1);
    } else if (this.triggeredBoss && this.player.node.position.x <= 715) {
      this.player.node.position.x = 712;
    }
    this.enemies.some(e => {
      if (e.node.position.x <= 715) e.node.position.x = 712;
    });

    if (
      (this.phase === 1 && this.enemies.length === 1) || // Phase 2
      (this.phase === 2 && this.lantern.node.onGround) || // Phase 3
      (this.phase === 3 && this.boss.health <= 30) || // Phase 4
      (this.phase === 4 && this.enemies.length === 1) || // Phase 5
      (this.phase === 5 && this.lantern.node.onGround) || // Phase 6
      (this.phase === 6 && this.boss.health <= 15) // Phase 7
    )
      this.initPhase(++this.phase);

    if (this.triggeredBoss && this.boss.health === 0) { // Handle boss death
      this.player.debugInvincible = true;
      new Timer(
        2000,
        () => {
          this.sceneManager.changeToScene(Congratulations); 
        },
        false,
      ).start();
    }
  }

  initPhase(phase: number) {
    switch (phase) {
      case 1: {
        this.spawnSpiders(4);
        this.spawnGhosts();
        break;
      }
      case 2: {
        this.spawnLantern();
        this.spawnProjectiles();
        this.projTimer.start();
        break;
      }
      case 3: {
        this.emitter.fireEvent(SpiderBossEvents.Transition);
        break;
      }
      case 4: {
        this.emitter.fireEvent(SpiderBossEvents.Cocoon);

        this.projTimer.reset();
        this.projTimer.pause();

        this.spawnSpiders(3);
        this.spawnGhosts();
        new Timer(
          9000,
          () => {
            this.spawnSpiders(2);
          },
          false,
        ).start();
        break;
      }
      case 5: {
        this.spawnProjectiles();
        this.spawnLantern();
        this.projTimer.start();
        break;
      }
      case 6: {
        this.emitter.fireEvent(SpiderBossEvents.Transition);
        this.spawnSpiders(2);
        break;
      }
      case 7: {
        this.projTimer.reset();
        this.projTimer.pause();
        this.projTimer = new Timer(
          2100,
          () => {
            this.spawnProjectiles();
          },
          true,
        );
        this.projSpeed = 250;
        this.projTimer.start();

        this.spawnSpiders(3);
        this.spawnGhosts();
        
        const spawnWaves = new Timer(
          12000,
          () => {
            this.spawnSpiders(2);
            this.spawnGhosts();
          },
          true,
        );
        spawnWaves.start();
        break;
      }
    }
  }

  spawnLantern() {
    const lanternSpawn = this.resourceManager
      .getTilemap("tilemap")
      .layers.find(x => x.name == "LanternSpawn").objects;

    this.lantern = new LanternCorpse(
      this.add.animatedSprite("LanternCorpse", Layers.Main),
      new Vec2(lanternSpawn[0].x, lanternSpawn[0].y),
    );
    this.enemies.push(this.lantern);
  }

  spawnSpiders(count: number) {
    const spiderSpawn = this.resourceManager
      .getTilemap("tilemap")
      .layers.find(x => x.name == "SpiderSpawn").objects;

    // spawn spiders
    for (let i = 0; i < count; i++) {
      const spider = new Spider(
        this.add.animatedSprite("Spider", Layers.Main),
        new Vec2(spiderSpawn[i].x, spiderSpawn[i].y),
      );
      this.enemies.push(spider);
    }
  }
  spawnGhosts() {
    const ghostSpawn = this.resourceManager
      .getTilemap("tilemap")
      .layers.find(x => x.name == "GhostSpawn").objects;

    // spawn ghosts
    for (let i = 0; i < ghostSpawn.length; i++) {
      const ghost = new Ghost(
        this.add.animatedSprite("RedSoul", Layers.Main),
        new Vec2(ghostSpawn[i].x, ghostSpawn[i].y),
        GhostType.RED,
      );
      this.enemies.push(ghost);
    }
  }

  spawnProjectiles(): void {
    const leftSpawn = this.resourceManager
      .getTilemap("tilemap")
      .layers.find(x => x.name == "ProjectileLeft").objects;

    const rightSpawn = this.resourceManager
      .getTilemap("tilemap")
      .layers.find(x => x.name == "ProjectileRight").objects;

    for (let i = 0; i < leftSpawn.length; i++) {
      const proj = this.add.animatedSprite("WebProjectile", Layers.Main);
      new Hitbox(
        this.boss.node,
        proj,
        DamageType.TO_PLAYER,
        new Vec2(16, 7),
        true,
        Vec2.ZERO,
        HType.Projectile,
        new Vec2(this.projSpeed, 0),
        new Vec2(leftSpawn[i].x, leftSpawn[i].y),
      );

      const rightDelay = new Timer(
        3000,
        () => {
          for (let i = 0; i < rightSpawn.length; i++) {
            const proj = this.add.animatedSprite("WebProjectile", Layers.Main);
            new Hitbox(
              this.boss.node,
              proj,
              DamageType.TO_PLAYER,
              new Vec2(16, 7),
              false,
              Vec2.ZERO,
              HType.Projectile,
              new Vec2(-this.projSpeed, 0),
              new Vec2(rightSpawn[i].x, rightSpawn[i].y),
            );
          }
        },
        false,
      );
      rightDelay.start();
    }
  }

  initBossHp(): void {
    const bossName = <Label>this.add.uiElement(UIElementType.LABEL, Layers.UI, {
      position: new Vec2(300, 355),
      text: "THE SPINDLER",
    });
    bossName.textColor = Color.WHITE;
    bossName.size = new Vec2(600, 35);
    bossName.font = "MEGAPIX";
    bossName.fontSize = 45;

    const bossHealthBarBg = <Label>this.add.uiElement(
      UIElementType.LABEL,
      Layers.UI,
      {
        position: new Vec2(300, 380),
        text: "",
      },
    );
    bossHealthBarBg.size = new Vec2(600, 35);
    bossHealthBarBg.backgroundColor = Color.BLACK;

    this.bossHealthBar = <Label>this.add.uiElement(
      UIElementType.LABEL,
      Layers.UI,
      {
        position: new Vec2(300, 380),
        text: "",
      },
    );
    this.bossHealthBar.size = new Vec2(600, 35);
    this.bossHealthBar.backgroundColor = this.healthBarColor;
    this.bossHealthBar.borderWidth = 2;
    this.bossHealthBar.borderRadius = 0;

    const bossHealthBarBorder = <Label>this.add.uiElement(
      UIElementType.LABEL,
      Layers.UI,
      {
        position: new Vec2(300, 380),
        text: "",
      },
    );
    bossHealthBarBorder.size = new Vec2(600, 35);
    bossHealthBarBorder.borderColor = Color.WHITE;
    bossHealthBarBorder.borderWidth = 4;
    bossHealthBarBorder.borderRadius = 0;
  }

  handleEvent(event: GameEvent) {
    super.handleEvent(event);

    switch (event.type) {
      case Events.ENEMY_DAMAGE: {
        const enemy = event.data.get("enemy");

        if (!enemy.isInvincible && enemy instanceof SpiderBoss) {
          // damage animation
          this.boss.takeDamage();

          this.bossHealthBar.size.x = 600 * (this.boss.health / 50);

          if (enemy.health <= 0)
            this.emitter.fireEvent(Events.ENEMY_DEATH, { enemy: enemy });
        }
        break;
      }
    }
  }

  initializeMonoliths() {
    this.resourceManager
      .getTilemap("tilemap")
      .layers.find(x => x.name == "Monoliths")
      .objects.forEach(m => {
        new Monolith(
          this.add.animatedSprite("Monolith", Layers.Main),
          new Vec2(m.x, m.y),
          m.name,
        );
      });
  }

  spawnBoss() {
    const bossPosition = this.resourceManager
      .getTilemap("tilemap")
      .layers.find(x => x.name == "BossSpawn").objects;
    const spiderBoss = new SpiderBoss(
      this.add.animatedSprite("SpiderBoss", Layers.Main),
      new Vec2(bossPosition[0].x, bossPosition[0].y),
    );

    this.boss = spiderBoss;
    this.enemies.push(spiderBoss);
  }
}
