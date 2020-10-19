import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner'
import InfiniteScroll from 'react-infinite-scroll-component';
import {BsFillHeartFill} from 'react-icons/bs';
import Alert from 'react-bootstrap/Alert';

class ListUniversities extends Component {
      constructor(props) {
        super(props);
        this.state = {uniName:"",
        country:"",
        loading:false,
        data: [],
        dataSliced:[],
        dataLength:null,
        start:null,
        end:null,
        hasMore:false,
        favorite:[],
        dataFound:true
        };
        
        this.handleChangeUniName = this.handleChangeUniName.bind(this);
        this.handleChangeCountry = this.handleChangeCountry.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.fetchMoreData = this.fetchMoreData.bind(this);
        this.handleFavorite = this.handleFavorite.bind(this);
      }
    
      handleChangeUniName(event) {
        this.setState({uniName: event.target.value});
      }
      handleChangeCountry(event) {
        this.setState({country: event.target.value});
      }
      async handleFavorite(event){
        let joined = event.currentTarget.dataset.idx;
        const pushUni = this.state.data[joined];
        const resOpt = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({userLogin:localStorage.getItem('loginEmail'),uni:pushUni}),
        }
        const response = await fetch('/api/addtofav', resOpt);
        const body = await response.statusText;
        if(body.statusText==="OK")
        {
          this.setState({
            favorite: this.state.favorite.concat(joined),
            dataSliced:this.state.data.slice(0,this.state.end)
          })
        }

      }
      handleClick(event){
        const uniName = this.state.uniName;
        const country = this.state.country;
        let param = "";
        if(uniName!==""&&country!==""){
            param = "name="+uniName+"&country="+country;
        }
        else if(uniName!==""&&country===""){
            param = "name="+uniName
        }
        else if(uniName===""&&country!==""){
            param = "country="+country;
        }
        else(
            this.setState({data:[]})
        )
        fetch(`http://universities.hipolabs.com/search?${param}`)
          .then(res => 
            res.json(),
            this.setState({loading:true}))
          .then(data => {
            data.forEach(d=>{
              d["isSave"]=false
            })
            if(this.state.favorite.length>0){
              this.state.favorite.forEach(item => {
                if(data[item]){
                  data[item]["isSave"]=true
                }
              })
            }
            this.setState({
              data,
              loading:false,
              dataSliced:data.slice(0,10),
              dataLength:data.length,
              start:0,
              end:10,
              hasMore:data.length>10?true:false,
              dataFound:data.length>0?true:false
            })
          }
          )
      }
      fetchMoreData(){
        if(this.state.end>=this.state.dataLength+1)
        {
            this.setState({hasMore:false})
        }
        console.log("previous slice start ="+this.state.start+",end ="+this.state.end);
        let startSlice = this.state.start+10;
        let endSlice = this.state.end+10;
        this.setState({start:startSlice,end:endSlice})
        console.log("Current slice start ="+this.state.start+",end ="+this.state.end);
        let currentLoad = this.state.data.slice(startSlice,endSlice)
        setTimeout(() => {this.setState({dataSliced: this.state.dataSliced.concat(currentLoad)});}, 1500);
      };
    
    render(){
        const spinner = 
        <Button id="loadingBtn" variant="primary" disabled>
          <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
          />
          Searching...
          </Button>
      
        const loadmore = 
        <div className="loadmore">
          <div className="spinner-grow text-primary"></div>
          <div className="spinner-grow text-primary"></div>
          <div className="spinner-grow text-primary"></div>
          <div className="spinner-grow text-primary"></div>
          <div className="spinner-grow text-primary"></div>
        </div>

        const alert =  <Alert variant='info'>Data not found...!!!</Alert>
        
        const dt = this.state.dataSliced.map((row,index) =>
        <div className='col-sm-4' style={{ padding: '5px' }} key={index} data-testid={index}>
        <Card >
          <Card.Body>
          <Card.Title>{row.name}</Card.Title>
          <Card.Text>{row.country}</Card.Text>
          <Button variant='primary'><a className="visitWeb" href={row.web_pages[0]} rel="noopener noreferrer">Visit Website</a></Button>
          <BsFillHeartFill className={row.isSave?"iconFav save":"iconFav"} data-idx={index} onClick={this.handleFavorite}/>
          </Card.Body>
        </Card></div>);

    return (
        <div className='container'>
            <Form inline>
            <FormControl type="text" placeholder="University Name" className="mr-sm-2" value={this.state.uniName} onChange={this.handleChangeUniName} />
            <FormControl type="text" placeholder="Country" className="my-2 mr-sm-2" value={this.state.country} onChange={this.handleChangeCountry} />
            <Button data-testid="searchbtn" variant="outline-primary" onClick={this.handleClick}>Search</Button>
            </Form>
            {!this.state.dataFound? alert:""}
            <InfiniteScroll
                dataLength={this.state.dataSliced.length}
                next={this.fetchMoreData}
                hasMore={this.state.hasMore}
                loader={loadmore}
                >
            <div className='row'>
                {this.state.loading ? spinner : dt}
            </div>
            </InfiniteScroll>
        </div>
        
      );
    }
}

export default ListUniversities;
