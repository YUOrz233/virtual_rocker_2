// 发送消息的事件名
const eventName = 'moveMode'

const moveModeEnum = {
    UP: 'w',
    DOWN: 's',
    LEFT: 'a',
    RIGHT: 'd',
    STOP: '0'
}
const PI = 3.14

// 用于设置消息发送的频率
const FPS = 30

cc.Class({
    extends: cc.Component,

    properties: {
        player: {
            default: null,
            type: cc.Node
        },

        rocker_bg: {
            default: null,
            type: cc.Node,
            visible: false
        },
        stick: {
            default: null,
            type: cc.Node,
            visible: false
        },
        MAX_R: {
            default: 0,
            type: cc.Float,
            visible: false
        },
        moveMode: {
            default: moveModeEnum.STOP,
            type: cc.Enum(moveModeEnum),
            visible: false
        },
        moveDIr: {
            default: cc.v2(0, 0),
            visible: false
        },

        // 灵敏度，用于控制发送消息的频率，缓解因频繁切换moveMode而导致的频繁发送消息的问题
        sensitivity: 0.5,

        msgInterval: {
            default: 0,
            type: cc.Integer,
            visible: false
        },
        count: {
            default: 0,
            type: cc.Integer,
            visible: false
        },
        msgFlag: {
            default: true,
            visible: false
        }
    },

    onLoad() {
        this.rocker_bg = this.node.getChildByName('rocker_bg');
        this.stick = this.node.getChildByName('stick');
        this.MAX_R = this.rocker_bg.width / 2;

        if (this.sensitivity > 1 || this.sensitivity < 0) {
            cc.error('灵敏度设置错误，需要在[0, 1]之间');
        }
        this.msgInterval = Math.ceil(FPS * (1 - this.sensitivity));
        if (this.sensitivity == 1) {
            this.msgInterval = 1;
        }

        this.initTouchEvent();
    },

    initTouchEvent() {
        var node = this.rocker_bg;

        node.on(cc.Node.EventType.TOUCH_START, this.touchStartEvent, this);
        node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMoveEvent, this);
        node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchEndEvent, this);
        node.on(cc.Node.EventType.TOUCH_END, this.touchEndEvent, this);
    },

    touchStartEvent: function (event) {
        let pos = this.node.convertToNodeSpaceAR(event.getLocation());

        let distance = pos.sub(this.node.getPosition()).mag();
        if (distance <= this.MAX_R) {
            this.stick.setPosition(pos);
        }
    },

    touchMoveEvent: function (event) {
        let pos = this.node.convertToNodeSpaceAR(event.getLocation());

        let distance = pos.mag();
        if (distance > this.MAX_R) {
            // sin角度相同 pos.x / distance = x / r
            pos.x *= this.MAX_R / distance;
            pos.y *= this.MAX_R / distance;

            distance = this.MAX_R;
        }
        this.stick.setPosition(pos);

        
        this.setMoveMode(pos);
    },

    setMoveMode: function (moveDIr) {
        let moveMode = null;

        let signAngle = moveDIr.signAngle(cc.v2(1, 0));
        let angle = PI / 4;

        if (signAngle >= -3 * angle && signAngle < -angle) {
            moveMode = moveModeEnum.UP;
        }
        else if (signAngle >= angle && signAngle < 3 * angle) {
            moveMode = moveModeEnum.DOWN;
        }
        else if (signAngle >= -angle && signAngle < angle) {
            moveMode = moveModeEnum.RIGHT;
        }
        else {
            moveMode = moveModeEnum.LEFT;
        }

        this.sendMsg(moveMode);
    },

    touchEndEvent: function (event) {
        this.stick.setPosition(0, 0);
        this.sendMsg(moveModeEnum.STOP);
    },

    sendMsg: function (mode) {
        // 如果移动模式没变则不发送消息
        if (mode == this.moveMode) {
            return;
        }

        let msg = null;
        switch (mode) {
            case moveModeEnum.STOP: {
                this.moveMode = moveModeEnum.STOP;
                msg = 'STOP';
                break;
            }
            case moveModeEnum.UP: {
                this.moveMode = moveModeEnum.UP;
                msg = 'UP';
                break;
            }
            case moveModeEnum.DOWN: {
                this.moveMode = moveModeEnum.DOWN;
                msg = 'DOWN';
                break;
            }
            case moveModeEnum.LEFT: {
                this.moveMode = moveModeEnum.LEFT;
                msg = 'LEFT';
                break;
            }
            case moveModeEnum.RIGHT: {
                this.moveMode = moveModeEnum.RIGHT;
                msg = 'RIGHT';
                break;
            }
            default: {
                cc.error('mode错误');
                break;
            }
        }

        if (this.msgFlag) {
            this.msgFlag = false;
            this.player.emit(eventName, msg);
        }

    },

    update(dt) {
        if(!this.msgFlag){
            this.count++;

            if (this.count >= this.msgInterval) {
                this.msgFlag = true;
                this.count = 0;
            }
        }
        
    }
});
