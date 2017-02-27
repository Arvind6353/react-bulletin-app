import React, { Component } from 'react';
import './App.css';

import Draggable from 'react-draggable'; 


class Note extends Component {


   constructor(props){
        super(props);

        this.edit=this.edit.bind(this);
        this.remove=this.remove.bind(this);
        this.update=this.update.bind(this);

        this.state ={

        	editing:false
        };


     } 


    componentWillMount() {
        this.style = {
            right: this.randomBetween(0, window.innerWidth - 150) + 'px',
            top: this.randomBetween(0, window.innerHeight - 150) + 'px',
            transform: 'rotate(' + this.randomBetween(-5, 5) + 'deg)'
        };
    }

     randomBetween(min, max) {
        return (min + Math.ceil(Math.random() * max));
    }

     renderForm(){

     	return (
	     	<div className="note" style={this.style} >


	     		<textarea  ref="noteText" className="form-control" defaultValue={this.props.children}></textarea>
	     		<button onClick={this.update}> Update</button>

	     	</div>
		)
     }


    renderNote(){
    	return (
      		<div className="note"  style={this.style} >
	      		<h3>{this.props.children}</h3>

	      		<button onClick={this.edit}>Edit</button>
	      		<button onClick={this.remove}>X</button>
      		</div>
      	)	
    }

  render() {

    return (
     

      	<Draggable>

     		
      		{this.state.editing?this.renderForm(): this.renderNote()}
      	
      	
      	</Draggable>

    );
  };

  edit(){

  		this.setState({editing:true});
		//this.props.onUpdate("updated ", this.props.id);

  }

  update(){
	
	this.setState({editing:false});
	this.props.onUpdate(this.refs.noteText.value, this.props.id);


  }

  remove(){

  	this.props.onRemove(this.props.id);
  }


}

export default Note;
