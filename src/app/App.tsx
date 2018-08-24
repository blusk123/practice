import React, { PureComponent } from 'react';

interface Props {
    name: string,
    type: string
}

export default class App extends PureComponent<Props, any> {
    componentDidMount() {
        this.test('1');
        this.work();
    }
    test = (type: string) => { 

    }
    work = () => {
        
    }
    render() {
        return (
            <div>2221</div>
        )
    }
}