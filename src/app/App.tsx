import React, { PureComponent } from 'react';
var huang = require('raw-loader!./txt/huang.txt');
import prism from 'prismjs';
import './code.less';

export interface State {
    readonly [index: string]: any
}

export default class App extends PureComponent<{}, State> {
    state: State = {
        codeDom: '',
        codeStyle: '',
        aniDom: '',
        aniStyle: ''
    }
    // code的index值
    codeIndex: number = 0 
    // ani的index值
    aniIndex: number = 0
    componentDidMount() {
        this.initTxt();
    }
    // 初始化函数
    initTxt = async () => {
        await this.readLetter(huang);
    }
    // 更改state
    changeState = (char: string, time:number) => new Promise((resolve, reject) => setTimeout(() => {
        const { codeDom, codeStyle } = this.state;
        const item: string = prism.highlight(codeDom + char, prism.languages.css);
        // console.log(item);
        this.setState({
            codeDom: codeDom + char,
            codeStyle: item
        })
        this.codeContent.scrollTop = this.codeContent.scrollHeight;
        resolve();
    }, time));
    // 逐一读取函数
    readLetter = async (name: string) => {
        const speed = 1; //定义写字速度
        let time = 18;
        const char = name.slice(this.codeIndex, this.codeIndex + speed);
        this.codeIndex += 1;
        if( this.codeIndex > name.length ) {
            return;
        }
        time = char === ';' ? 88 : 18;
        await this.changeState(char, time);
        await this.readLetter(name);
    }
    render() {
        // console.log(prism.highlight(huang, prism.languages.css));
        const { codeDom, codeStyle } = this.state;
        return (
            <div className="container">
                <div className="code-container">
                    <div className="code"
                        ref={e => this.codeContent = e}
                        dangerouslySetInnerHTML={{ __html: codeStyle }}
                    ></div>
                    <style
                        dangerouslySetInnerHTML={{ __html: codeDom }}
                    ></style>
                </div>
                <div className="content-container">
                    <div className="content">
                        <div className="inside-container">
                            <div className="cube cube--1">
                                <div className="side side--back">
                                    <div className="side__inner"></div>
                                </div>
                                <div className="side side--left">
                                    <div className="side__inner"></div>
                                </div>
                                <div className="side side--right">
                                    <div className="side__inner"></div>
                                </div>
                                <div className="side side--top">
                                    <div className="side__inner"></div>
                                </div>
                                <div className="side side--bottom">
                                    <div className="side__inner"></div>
                                </div>
                                <div className="side side--front">
                                    <div className="side__inner"></div>
                                </div>
                            </div>
                            
                            <div className="cube cube--2">
                                <div className="side side--back">
                                    <div className="side__inner"></div>
                                </div>
                                <div className="side side--left">
                                    <div className="side__inner"></div>
                                </div>
                                <div className="side side--right">
                                    <div className="side__inner"></div>
                                </div>
                                <div className="side side--top">
                                    <div className="side__inner"></div>
                                </div>
                                <div className="side side--bottom">
                                    <div className="side__inner"></div>
                                </div>
                                <div className="side side--front">
                                    <div className="side__inner"></div>
                                </div>
                            </div>
                            
                            <div className="cube cube--3">
                                <div className="side side--back">
                                    <div className="side__inner"></div>
                                </div>
                                <div className="side side--left">
                                    <div className="side__inner"></div>
                                </div>
                                <div className="side side--right">
                                    <div className="side__inner"></div>
                                </div>
                                <div className="side side--top">
                                    <div className="side__inner"></div>
                                </div>
                                <div className="side side--bottom">
                                    <div className="side__inner"></div>
                                </div>
                                <div className="side side--front">
                                    <div className="side__inner"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}