import React, { Component } from 'react';
import './App.css';
import Draggable from 'react-draggable'; 
import { Button } from 'react-bootstrap';


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
            top: this.randomBetween(33, window.innerHeight - 150) + 'px',
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
	     		
	     		<Button bsStyle="primary" onClick={this.update}> Update</Button>

	     	</div>
		)
     }


    renderNote(){
    	return (
      		<div className="note"  style={this.style} >
	      		<h3>{this.props.children}</h3>

	      		<Button bsStyle="warning"onClick={this.edit}>Edit</Button>
	      		<Button bsStyle="danger"onClick={this.remove}>X</Button>

	      		
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
