import React, { Component } from 'react';
import Note from './Note';
import './App.css';
import $ from 'jquery'; 


class Board extends Component {


   constructor(props){
        super(props);
        this.state = {
                          notes:[]
                     }    

    

        this.edit=this.edit.bind(this);
        this.add=this.add.bind(this);
        this.remove=this.remove.bind(this);


    }

    componentWillMount(){

        console.log("will mount");
        var self=this;
         $.getJSON("http://baconipsum.com/api/?type=all-meat&sentences=" +
                this.props.noteCount + "&start-with-lorem=1&callback=?", function(results){
                results[0].split('. ').forEach(function(sentence){
                    self.add(sentence.substring(0,40));
                });
            });
    }



    render() {
      return (
       
        <div className="board">


          {this.state.notes.length===0?<h1> No notes found </h1>:""}
            
          { this.state.notes.map((note,i)=> 


              <Note key={note.id} id={note.id} onUpdate={this.edit} onRemove={this.remove}> {note.text}</Note> )


          }

          <button onClick={this.add.bind(null,"New Note")}>+</button>


        </div>


      );
    }


    add(text){

      var arr=this.state.notes;
      arr.push({
        id:this.getUniqueId(),
        text:text
      })

      this.setState({notes:arr});

    }


    getUniqueId(){

      this.id=this.id||0;
      return this.id++;

    }

    edit(text,id){

      var arr=this.state.notes;

      arr[id].text=text;

      this.setState({notes:arr})


    }


    remove(id){

      
      var arr= this.state.notes.filter( (note)=>{ return note.id!==id })

      this.setState({notes:arr})

    }




}

export default Board;
