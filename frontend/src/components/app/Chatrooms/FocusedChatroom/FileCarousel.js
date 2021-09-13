import React, { useEffect, useState } from 'react';
import { Avatar, Button } from 'react95';
import styled from 'styled-components';
import {
    DialogBackground,
    DialogCloseSpan,
} from '../../../shared/styled-components';
import Carousel from 'react-material-ui-carousel';
import { Magnifier } from 'react-image-magnifiers';

const PreviewWrapper = styled.div`
    display: flex;
    flex-flow: row wrap;

    .preview-avatar {
        margin: 2px;
        cursor: pointer;
        position: relative;

        &:hover .preview-avatar-close-btn {
            display: block;
        }

        .preview-avatar-close-btn {
            display: none;
            position: absolute;
            margin: 2px;
            cursor: pointer;
            top: -10px;
            right: -10px;
            z-index: 1000;
        }
    }
`;

const CarouselBackground = styled(DialogBackground)`
    cursor: default;

    .carousel-close-btn {
        position: fixed;
        cursor: pointer;
        top: 20px;
        right: 20px;
        z-index: 1;
    }

    .full-center {
        display: grid;
        justify-content: center;
        align-content: center;
    }

    .grid-carousel-container {
        height: 100%;
        width: 100%;

        .grid-carousel-item {
            width: 95vw;
            height: 85vh;

            & > img {
                height: 90%;
                width: 100%;
                max-height: 90%;
                max-width: 100%;
            }
        }
    }
`;

const GridCarousel = styled(Carousel)``;

function FullviewPicture({ file, getSrc, getType, ...props }) {
    const [src, setSrc] = useState();
    useEffect(() => {
        getSrc(file, setSrc);
    }, [getSrc, setSrc, file]);

    return (
        <div className='grid-carousel-item full-center'>
            {src && src.startsWith('data:') ? (
                <Magnifier imageSrc={src} imageAlt={file.name} />
            ) : (
                <img alt={file.name} {...props} />
            )}
        </div>
    );
}

function PreviewPicture({ file, getSrc, getType, onDeleteClick, ...props }) {
    const [src, setSrc] = useState();

    useEffect(() => {
        getSrc(file, setSrc);
    }, [getSrc, setSrc, file]);

    if (getType(file) === 'file')
        props.style = {
            width: 'auto',
            padding: '10px',
        };

    return (
        <div className='preview-avatar'>
            {onDeleteClick && (
                <Button
                    onClick={onDeleteClick}
                    className='preview-avatar-close-btn'
                >
                    <DialogCloseSpan>x</DialogCloseSpan>
                </Button>
            )}
            <Avatar square size={50} alt={file.name} src={src} {...props}>
                {file.name || 'File'}
            </Avatar>
        </div>
    );
}

export class FileCarousel extends React.Component {
    constructor(props) {
        super(props);
        this.getSrc = this.props.getSrc;
        this.getType = this.props.getType;
    }

    state = {
        carousel: false,
        carouselIndex: 0,
        carouselFilesMap: [],
    };

    static defaultProps = {
        files: [],
        getSrc: (file, setSrc) => {},
        getType: (file) => {},
    };

    componentDidUpdate() {
        if (this.state.carouselFilesMap.length !== this.props.files.length) {
            let carouselIndex = 0;
            this.setState({
                carouselFilesMap: this.props.files.map((file) => {
                    if (this.getType(file) === 'image') return carouselIndex++;
                    return -1;
                }),
            });
        }
    }

    renderDialog() {
        return (
            <CarouselBackground>
                <Button
                    className='carousel-close-btn'
                    onClick={() => this.setState({ carousel: false })}
                >
                    <DialogCloseSpan>x</DialogCloseSpan>
                </Button>
                <div className='grid-carousel-container full-center'>
                    <GridCarousel
                        autoPlay={false}
                        index={this.state.carouselIndex}
                        indicators={false}
                        navButtonsAlwaysVisible={true}
                    >
                        {this.props.files
                            .filter(
                                (f, i) => this.state.carouselFilesMap[i] >= 0,
                            )
                            .map((file, i) => (
                                <FullviewPicture
                                    key={`${i}_${file.name}_${file.size}_${file.lastModified}`}
                                    file={file}
                                    getSrc={this.props.getSrc}
                                    getType={this.props.getType}
                                />
                            ))}
                    </GridCarousel>
                </div>
            </CarouselBackground>
        );
    }

    render() {
        if (this.props.files.length === 0) return null;
        return (
            <PreviewWrapper>
                {this.props.files.map((file, i) => (
                    <PreviewPicture
                        key={`${i}_${file.name}_${file.size}_${file.lastModified}`}
                        onDeleteClick={
                            this.props.onDeleteClick
                                ? () => this.props.onDeleteClick(i)
                                : null
                        }
                        onClick={() => {
                            this.props.onItemClick &&
                                this.props.onItemClick(file, i);
                            const carouselIndex =
                                this.state.carouselFilesMap[i];
                            if (carouselIndex >= 0)
                                this.setState({
                                    carousel: true,
                                    carouselIndex,
                                });
                        }}
                        file={file}
                        getSrc={this.props.getSrc}
                        getType={this.props.getType}
                    />
                ))}
                {this.state.carousel && this.renderDialog()}
            </PreviewWrapper>
        );
    }
}
