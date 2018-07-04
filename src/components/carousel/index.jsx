import React from 'react'
import {Carousel, WingBlank} from 'antd-mobile';
import {withRouter} from 'react-router-dom'

@withRouter

export default class Carousels extends React.Component {
    state = {
        data: ['1', '2', '3'],
        imgHeight: 176,
    }

    render() {
        let {data} = this.props
        return (
            <WingBlank>
                <Carousel
                    style={{
                        padding: '16px',
                        background: '#DEF1E5',
                        overflow: 'hidden',
                    }}
                    dots={true}
                    dotStyle={{backgroundColor: 'red'}}
                    dotActiveStyle={{backgroundColor: '#000'}}
                    autoplay
                    infinite
                    frameOverflow="visible"
                    cellSpacing={10}
                    slideWidth={0.8}
                    afterChange={index => this.setState({slideIndex: index})}
                >
                    {data.map((val, index) => (
                        <a
                            key={val}
                            style={{
                                display: 'block',
                                position: 'relative',
                                top: this.state.slideIndex === index ? -10 : 0,
                                height: this.state.imgHeight,
                                boxShadow: '2px 1px 1px rgba(0, 0, 0, 0.2)',
                            }}
                        >
                            <img
                                src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                                alt=""
                                style={{width: '100%', verticalAlign: 'top'}}
                                onLoad={() => {
                                    window.dispatchEvent(new Event('resize'));
                                    this.setState({imgHeight: 'auto'});
                                }}
                            />
                        </a>
                    ))}
                </Carousel>
            </WingBlank>

        )
    }
}

