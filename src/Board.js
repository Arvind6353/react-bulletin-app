import React, { Component } from 'react';
import Note from './Note';
import './App.css';
import $ from 'jquery'; 
import { Button } from 'react-bootstrap';
import { Navbar,NavItem,NavDropdown ,Nav,MenuItem} from 'react-bootstrap';


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


          {this.renderNav()}


          {this.state.notes.length===0?<h1> No notes found </h1>:""}
            
          { this.state.notes.map((note,i)=> 


              <Note key={note.id} id={note.id} onUpdate={this.edit} onRemove={this.remove}> {note.text}</Note> )


          }

          
          <Button bsStyle="success" onClick={this.add.bind(null,"New Note")}>Add </Button>


        </div>


      );
    }


    renderNav(){

          return(
           <Navbar>
              <Navbar.Header>
                <Navbar.Brand>
                  <a href="#">React-Bootstrap</a>
                </Navbar.Brand>
              </Navbar.Header>
              <Nav>
                <NavItem eventKey={1} href="#">Link</NavItem>
                <NavItem eventKey={2} href="#">Link</NavItem>
                <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                  <MenuItem eventKey={3.1}>Action</MenuItem>
                  <MenuItem eventKey={3.2}>Another action</MenuItem>
                  <MenuItem eventKey={3.3}>Something else here</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey={3.3}>Separated link</MenuItem>
                </NavDropdown>
              </Nav>
            </Navbar>
          )

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
