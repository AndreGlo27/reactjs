import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner'
import InfiniteScroll from 'react-infinite-scroll-component';
import {BsFillHeartFill} from 'react-icons/bs';

class FavoriteUniversities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:null,
            fUni:[],
            start:null,
            end:null,
            dataLength:null,
            loading:false,
            hasMore:false,
            favorite:[]
        }

        this.fetchMoreData = this.fetchMoreData.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleFavorite = this.handleFavorite.bind(this);
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
            favorite: this.state.favorite.concat(joined)
          })
        }
        
      }

    async componentDidMount(){
        const response = await fetch('/api/read');
        const body = await response.json();
        
        if (response.status !== 200) throw Error(body.message);
        const usr = localStorage.getItem('loginEmail');
        body.forEach(item => {
            if(item.email===usr){
                this.setState({
                    data:item.favUni,
                    fUni:item.favUni.slice(0,10),
                    start:0,
                    end:10,
                    dataLength:item.favUni.length,
                    hasMore:item.favUni.length>10?true:false,
                })
            }
        });
        
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
        setTimeout(() => {this.setState({fUni: this.state.fUni.concat(currentLoad)});}, 1500);
      };

    render()
    {
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

        const card = this.state.fUni.map((row,index) =>
        <div className='col-sm-4' style={{ padding: '5px' }} key={index}>
        <Card >
          <Card.Body>
          <Card.Title>{row.name}</Card.Title>
          <Card.Text>{row.country}</Card.Text>
          <Button variant='primary'><a className="visitWeb" href={row.web_pages[0]}>Visit Website</a></Button>
          <BsFillHeartFill className="iconFav save" data-idx={index} onClick={this.handleFavorite} />
          </Card.Body>
        </Card></div>);
        return(
            <div className="container">
                <InfiniteScroll
                dataLength={this.state.fUni.length}
                next={this.fetchMoreData}
                hasMore={this.state.hasMore}
                loader={loadmore}
                >
                <div className='row'>
                    {this.state.loading ? spinner : card}
                </div>
                </InfiniteScroll>
        </div>
        )
    }
}

export default FavoriteUniversities;