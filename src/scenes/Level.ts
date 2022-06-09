
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import BotItem from "../components/BotItem";
import PushOnClick from "../components/PushOnClick";
/* START-USER-IMPORTS */
import IItem from "../types/IItem"
/* END-USER-IMPORTS */

const RESULT_WIN = 'WIN';
const RESULT_LOSE = 'LOSE';
const RESULT_DRAW = 'DRAW';

const KEY_ROCK = 'rock';
const KEY_PAPER = 'paper';
const KEY_SCISSORS = 'scissors';


const ITEMS : IItem[] = [
	{key:KEY_ROCK, win:KEY_SCISSORS, lose:KEY_PAPER},
	{key:KEY_SCISSORS, win:KEY_PAPER, lose:KEY_ROCK},
	{key:KEY_PAPER, win:KEY_ROCK, lose:KEY_SCISSORS}
];


export default class Level extends Phaser.Scene {

	clicked:boolean = false;
	curKey?:string;
	items?:BotItem[];
	userTxt?:Phaser.GameObjects.Text;
	botTxt?:Phaser.GameObjects.Text;
	resultTxt?:Phaser.GameObjects.Text;

	userScore:number = 0;
	botScore:number = 0;

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */

		/* END-USER-CTR-CODE */
	}

	private editorCreate(): void {

		// tilesprite_1
		this.add.tileSprite(400, 300, 800, 600, "bg");

		// logo
		this.add.image(400, 120, "logo");

		// paper
		const paper = this.add.image(400, 450, "paper");

		// rock
		const rock = this.add.image(260, 520, "rock");

		// scissors
		const scissors = this.add.image(540, 520, "scissors");

		// callToAction
		this.add.image(400, 560, "callToAction");

		// paper (components)
		new PushOnClick(paper, this.onItemClick);

		// rock (components)
		new PushOnClick(rock, this.onItemClick);

		// scissors (components)
		new PushOnClick(scissors, this.onItemClick);

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	/**
	 * BUILD VIEWS
	 */
	botCreate(): void {
		this.items = [];

		ITEMS.forEach((element, idx) => {
			this.items?.push(new BotItem(idx, element, this.onCenter, this ));
		});
		const cnt = this.add.container(400, 270, this.items);

		this.items[0].move();
	}

	textFieldsCreate(): void {
		// user
		this.userTxt = this.add.text(20, 20, `YOUR : ${this.userScore}`, { "fontSize": "30px", "color": "#ff8cf8" });
		this.userTxt.setOrigin(0, 0);

		//bot
		this.botTxt = this.add.text(780, 20, `BOT : ${this.botScore}`, { "fontSize": "30px", "color": "#ff8cf8" });
		this.botTxt.setOrigin(1, 0);

		//result
		this.resultTxt = this.add.text(400, 360, '', { "fontSize": "60px", "color": "#7fe0d3", 'fontStyle': 'bold', 'stroke': '#ffffff', 'strokeThickness' : 15});
		this.resultTxt.visible = false;
		this.resultTxt.setOrigin(.5, .5);

	}

	/**
	 * SCORE MANIPULATE
	 */
	private incUserScore(){
		this.userScore += 1;
		if(this.userTxt?.text) this.userTxt.text = `YOUR : ${this.userScore}`;
	}

	private incBotScore(){
		this.botScore += 1;
		if(this.botTxt?.text) this.botTxt.text = `BOT : ${this.botScore}`;
	}

	hideResult = () => {
		if(!this.resultTxt) return;

		this.add.tween({
			targets: this.resultTxt,
			scale: 1.2,
			alpha: 0,
			duration: 200,
			delay: 300,
			ease: 'easeOut',
			// onComplete: this.reset,
		});
	}

	private showResul(value:string){
		if(!this.resultTxt) return;

		this.resultTxt.text = value;
		this.resultTxt.scale = .5;
		this.resultTxt.alpha = 0;
		this.resultTxt.visible = true;
		this.resultTxt.depth = this.children.length;

		this.add.tween({
			targets: this.resultTxt,
			scale: 1,
			alpha: 1,
			duration: 200,
			ease: 'easeOut',
			onComplete: this.hideResult,
		});
	}

	/** 
	 * GAME LOGIC 
	 */
	reset = (item:BotItem) => {
		if(!this.clicked) return;

		if(this.resultTxt) this.resultTxt.visible = true;
		this.curKey = undefined;
		this.clicked = false;

		item.continue();
		this.playNext(item.idx);
	}

	playNext = (id:number) => {
		if(this.items){
			id = id === this.items.length -1 ? 0 : id+1;
			if(this.items[id]) this.items[id].move(this.clicked);
		}
	}

	onCenter = (item:BotItem, check:boolean = false) => {
		if(check){

			if(item.key === this.curKey){
				this.showResul(RESULT_DRAW);
			}else if(item.win === this.curKey){
				this.showResul(RESULT_LOSE);
				this.incBotScore();
			}else{
				this.showResul(RESULT_WIN);
				this.incUserScore();
			}

			setTimeout(this.reset, 700, item);
		}else{
			this.playNext(item.idx);
		}
	}


	/**
	 * ON BUTTON CLICK
	 */
	onItemClick = (key:string) => {
		if(this.clicked) return;

		this.curKey = key;
		this.clicked = true;
	}

	create() {
		this.editorCreate();
		this.textFieldsCreate();
		this.botCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
