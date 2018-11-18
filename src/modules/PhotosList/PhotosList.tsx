import * as React from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import styled from 'styled-components';
import * as $ from 'jquery';
import { ThunkDispatch } from 'redux-thunk';

import {Photo} from './Photo';
import './photos.css';
import { IPhoto } from '../../reducers/photos/models';
import { getPhotos } from '../../actions/photos_action';
import { IStore } from '../../reducers/index';
import { Loader } from 'src/utilities/Loader';

interface IProps{
    photos: IPhoto[];
    isLoading: boolean;
}

interface IState{
    isVisible: boolean;
}

interface IMapStateToProps {
    photos: IPhoto[];
    isLoading: boolean;
}

interface IMapDispatchToProps {
    getPhotos: (onSuccess?: any) => Promise<void>;
}

interface IProps extends IMapStateToProps, IMapDispatchToProps {}

const SSection = styled.div`
    width: 200px;
    padding: 0px;
    display: inline-flex;
    flex-wrap: wrap;
`;

class PhotoList extends React.Component<IProps, IState>{

    componentDidMount(){

        this.props.getPhotos();

        $('#root').append(
            `<div class='modal fade' id='myModal' role='dialog' aria-labelledby='myModalLabel'>
                <div class='modal-dialog' role='document'>
                <div class='modal-content'>
                <div class='modal-header'>
                <button type='button' id='closebtn1' class='close' data-dismiss='modal' aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
                </button><h4 class='modal-title' id='modalLabel'></h4></div>
                <div class='modal-body'>
                <img id='modalImg' class='center' src='' width='500' height='500' />
                </div>
                <div class='modal-footer'>
                <button id='closebtn2' type='button' class='btn btn-default' data-dismiss='modal'>Close</button>
                </div>
                </div>
                </div>
        </div>`); 

        $('#closebtn1').click(() => {
            $('#myModal').removeClass("show").addClass("fade");
        });

        $('#closebtn2').click(() => {
            $('#myModal').removeClass("show").addClass("fade");
        });
    }

    onClick(title: string, url: string){
        $('#modalLabel').html(title);
        $('#modalImg').attr('src', url);
        $('#myModal').removeClass("fade").addClass("show");
    }

    render(){

        if(this.props.isLoading){
            return <Loader />;
        }

        const photos = this.props.photos.map((photo: IPhoto, index: number) => {
                return <SSection key={index} onClick={this.onClick.bind(this, photo.title, photo.url)}><Photo
                key={index}
                id={index} 
                title={photo.title}
                thumbnailUrl={photo.thumbnailUrl}
                url={photo.url}
            /></SSection>
        });

        return (<div id='div'>{photos} </div>)
    }
}

const mapStateToProps = (state: IStore): IMapStateToProps => { 
    
    const photosArr = [];  
    for (const item in state.photos) {   
        if (state.photos[item] && state.photos[item] instanceof Object) {
            photosArr.push(state.photos[item])
        }
    }
    
    return ({
        photos: photosArr,
        isLoading: state.photos.isLoading 
    })
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, Action>): IMapDispatchToProps => ({
    getPhotos: (onSuccess?: any) => dispatch(getPhotos(onSuccess)),
});

export const PhotosList = connect(mapStateToProps, mapDispatchToProps)(PhotoList);
