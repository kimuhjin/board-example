import React, {Component} from 'react';
import TOC from "./components/TOC";
import Readcontent from "./components/Readcontent";
import Createcontent from './components/Createcontent';
import UpdateContent from './components/UpdateContent';
import Subject from "./components/Subject";
import Control from './components/Control';

import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode:'create',
      selected_content_id:2,
      subject:{title:'WEB', sub:'World Wide WEB@'},
      welcome:{title:'Welcome', desc:"Hello, REACT"},
      contents:[
        {id:1, title:'HTML',desc:'HTML is a'},
        {id:2, title:'CSS',desc:'CSS is b'},
        {id:3, title:'JavaScript',desc:'Java is c'} 
      ]
    }
  }
  
  getReadContent(){
    var i = 0;
      while(i < this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id===this.state.selected_content_id){
          return data;
          //break;
          }
          i=i+1;
        }
    }
  getContent()
  {
    var _title,_desc,_article = null;
    if(this.state.mode === "welcome"){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article=<Readcontent title={_title} desc={_desc}></Readcontent>
    }
    else if (this.state.mode === "read"){
      var _content=this.getReadContent();
     _article=<Readcontent title={_content.title} desc={_content.desc}></Readcontent>
  } else if(this.state.mode==='create'){
      _article=<Createcontent onSubmit={function(_title,_desc){
       this.max_content_id =this.max_content_id+1;
       var _contents = Array.from(this.state.contents);
       _contents.push({id:this.max_content_id, title:_title, desc:_desc});
       this.setState({
          contents:_contents,
          mode:'read',
          selected_content_id:this.max_content_id
        });
      }.bind(this)}></Createcontent>
    } else if(this.state.mode==='update'){
        _content=this.getReadContent();
        _article=<UpdateContent data={_content} onSubmit={
          function(_id,_title,_desc){
           var _contents= Array.from(this.state.contents);
          var i=0;
          while(i<_contents.length){
            if(_contents[i].id===_id){
              _contents[i] = {id:_id, title:_title,desc:_desc}
              break;
            }
            i=i+1;
          }
         this.setState({
            contents:_contents,
            mode:'read'
          });
        }.bind(this)}></UpdateContent>
  }
  return _article;
  }
  render() {
  console.log('App render');
  return (
    <div className="App">
      <Subject 
      title={this.state.subject.title} 
      sub={this.state.subject.sub} 
      onChangePage={function(){
        this.setState({mode:'welcome'});
      }.bind(this)}>
      </Subject>
      <TOC 
      onChangePage={function(id){
        this.setState({
          mode:'read',
          selected_content_id:Number(id)
        });
      }.bind(this)}
      data={this.state.contents}
      >       
      </TOC>
      <Control onChangeMode={function(_mode){
        if(_mode === 'delete'){
          if(window.confirm('정말 삭제하시겠습니까?')){
            var _contents = Array.from(this.state.contents);
            var i =0;
            while(i<_contents.length){
              if(_contents[i].id === this.state.selected_content_id){
                _contents.splice(i,1);
                break;
              }
              i=i+1;
            }
            this.setState({
              mode:'welcome',
              contents:_contents
            });
            alert('삭제되었습니다.');
          }
        }
        else{
          this.setState({
          mode:_mode
        });
      }
      }.bind(this)}></Control>
      {this.getContent()}
    </div>
  );
  }
}


export default App;
