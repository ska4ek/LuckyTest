import Phaser from "phaser";
import IItem from "../types/IItem"

const SPEED = 150;

export default class BotItem extends Phaser.GameObjects.Image {

	constructor(private id:integer, private itemInfo:IItem, private onCenter:(item:BotItem, win:boolean) => void, scene: Phaser.Scene, x: number = 0, y: number = 0, texture?: string | Phaser.Textures.Texture, frame?: string | number) {
		super(scene, x, y, itemInfo.key, frame);
		this.visible = false;
	}

	public get idx() : integer {
		return this.id;
	}

	public get win() : string {
		return this.itemInfo.win;
	}

	public get lose() : string {
		return this.itemInfo.lose;
	}

	public get key() : string {
		return this.itemInfo.key;
	}


	move = (andStop :boolean = false) => {
		this.visible = true;
		this.alpha = 0;
		this.scale = .5;
		this.y = -5;

		this.scene.add.tween({
			targets: this,
			scale: 1,
			alpha: 1,
			y: 0,
			duration: SPEED,
			ease: 'easeOut',
			onComplete: () => this.onCenter(this, andStop),
		});

		if(!andStop)
			this.continue();
	}

	continue = () => {
		this.scene.add.tween({
			targets: this,
			scale: 1.2,
			alpha: 0,
			y: 5,
			duration: SPEED,
			delay: SPEED,
			ease: 'easeOut',
		});
	}

}
