
cc.Class({
    extends: cc.Component,

    properties: {
        moveDir: {
            default: cc.v2(0, 0),
            visible: false
        },
        moveState: {
            default: false,
            visible: false
        },
    },
    onLoad() {
        this.node.on('moveMode', this.move, this);
    },

    move(msg) {
        cc.log(msg);
        this.moveState = true;
        switch (msg) {
            case 'STOP': {
                this.moveState = false;
                break;
            }
            case 'UP': {
                this.moveDir = cc.v2(0, 1);
                break;
            }
            case 'DOWN': {
                this.moveDir = cc.v2(0, -1);
                break;
            }
            case 'LEFT': {
                this.moveDir = cc.v2(-1, 0);
                break;
            }
            case 'RIGHT': {
                this.moveDir = cc.v2(1, 0);
                break;
            }
            default: {
                cc.error('msg错误');
                break;
            }
        }
    },
    update(dt) {
        if (this.moveState) {
            let nowPos = this.node.getPosition();
            let nextPos = nowPos.add(this.moveDir);
            this.node.setPosition(nextPos);
        }
    },
});
