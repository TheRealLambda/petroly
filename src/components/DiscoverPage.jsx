import NavBar from "./NavBar"
import Tag from "./Tag"
import "./styles/discover_page.css"

const DiscoverPage = () => {

  return (
    <div className="discover_page">
      <NavBar />
      <div className="heading bgcolor-primary">
        <div>
          <h1 className="color-white">Discover</h1>
          <p className="text-14-regular color-white">Browse recent club activities and university announcments</p>
        </div>
      </div>
      <div className="filter">
        <div className="chosen bgcolor-primary color-white text-14-regular">All</div>
        <div className="bgcolor-white color-accent text-14-regular">Clubs</div>
        <div className="bgcolor-white color-accent text-14-regular">University</div>
        <div className="bgcolor-white color-accent text-14-regular">Personal</div>
      </div>
      <div className="section">
        <div className="title">
          <h5 className="color-accent">KFUPM News</h5>
          <div>
            <p className="text-12-medium color-accent">see more</p>
            <svg className="fillcolor-accent" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#5f6368"><path d="M412-480 284-658q-14-19.68-3-40.84Q292-720 316.06-720q9.62 0 18.28 4 8.66 4 13.66 12l160 224-160 224q-4.85 7.53-13.58 11.76Q325.7-240 316-240q-24 0-35-21.16t3-40.84l128-178Zm212 0L497-658q-14-19.68-3-40.84Q505-720 529.14-720q9.65 0 18.34 4.5T561-703l159 223-159 224q-4.85 7.53-13.58 11.76Q538.7-240 529-240q-24 0-35-21.16t3-40.84l127-178Z"/></svg>
          </div>
        </div>
        <div className="carousal_wrapper">
          <div className="carousal">
            <div className="carousal_item" style={{backgroundImage: "linear-gradient(0deg, rgba(0,0,0,1.0), rgba(0,0,0,0) 50%), url(/download.png)", backgroundSize: "cover"}}>
              <p className="text-13-semibold color-white0">حوّل أفكارك إلى منتجات دفاعيّة</p>
              <div className="tags_list">
                <Tag name="KFUPM" color="green"/>
              </div>
            </div>
            <div className="carousal_item" style={{backgroundImage: "linear-gradient(0deg, rgba(0,0,0,1.0), rgba(0,0,0,0) 50%), url(/download.png)", backgroundSize: "cover"}}>
              <p className="text-13-semibold color-white0">حوّل أفكارك إلى منتجات دفاعيّة</p>
              <div className="tags_list">
                <Tag name="KFUPM" color="green"/>
                <Tag name="JADEER" color="cyan"/>
                <Tag name="ASD" color="brown"/>
                <Tag name="ASD" color="brown"/>
                <Tag name="ASD" color="brown"/>
              </div>
            </div>
            <div className="carousal_item" style={{backgroundImage: "linear-gradient(0deg, rgba(0,0,0,1.0), rgba(0,0,0,0) 50%), url(/download.png)", backgroundSize: "cover"}}>
              <p className="text-13-semibold color-white0">حوّل أفكارك إلى منتجات دفاعيّة</p>
              <div className="tags_list">
                <Tag name="KFUPM" color="green"/>
              </div>
            </div>
            <div className="carousal_item" style={{backgroundImage: "linear-gradient(0deg, rgba(0,0,0,1.0), rgba(0,0,0,0) 50%), url(/download.png)", backgroundSize: "cover"}}>
              <p className="text-13-semibold color-white0">حوّل أفكارك إلى منتجات دفاعيّة</p>
              <div className="tags_list">
                <Tag name="KFUPM" color="green"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="title">
          <h5 className="color-accent">KFUPM News</h5>
          <div>
            <p className="text-12-medium color-accent">see more</p>
            <svg className="fillcolor-accent" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#5f6368"><path d="M412-480 284-658q-14-19.68-3-40.84Q292-720 316.06-720q9.62 0 18.28 4 8.66 4 13.66 12l160 224-160 224q-4.85 7.53-13.58 11.76Q325.7-240 316-240q-24 0-35-21.16t3-40.84l128-178Zm212 0L497-658q-14-19.68-3-40.84Q505-720 529.14-720q9.65 0 18.34 4.5T561-703l159 223-159 224q-4.85 7.53-13.58 11.76Q538.7-240 529-240q-24 0-35-21.16t3-40.84l127-178Z"/></svg>
          </div>
        </div>
        <div className="carousal_wrapper">
          <div className="carousal">
            <div className="carousal_item" style={{backgroundImage: "linear-gradient(0deg, rgba(0,0,0,1.0), rgba(0,0,0,0) 50%), url(/download.png)", backgroundSize: "cover"}}>
              <p className="text-13-semibold color-white0">حوّل أفكارك إلى منتجات دفاعيّة</p>
              <div className="tags_list">
                <Tag name="KFUPM" color="green"/>
              </div>
            </div>
            <div className="carousal_item" style={{backgroundImage: "linear-gradient(0deg, rgba(0,0,0,1.0), rgba(0,0,0,0) 50%), url(/download.png)", backgroundSize: "cover"}}>
              <p className="text-13-semibold color-white0">حوّل أفكارك إلى منتجات دفاعيّة</p>
              <div className="tags_list">
                <Tag name="KFUPM" color="green"/>
              </div>
            </div>
            <div className="carousal_item" style={{backgroundImage: "linear-gradient(0deg, rgba(0,0,0,1.0), rgba(0,0,0,0) 50%), url(/download.png)", backgroundSize: "cover"}}>
              <p className="text-13-semibold color-white0">حوّل أفكارك إلى منتجات دفاعيّة</p>
              <div className="tags_list">
                <Tag name="KFUPM" color="green"/>
              </div>
            </div>
            <div className="carousal_item" style={{backgroundImage: "linear-gradient(0deg, rgba(0,0,0,1.0), rgba(0,0,0,0) 50%), url(/download.png)", backgroundSize: "cover"}}>
              <p className="text-13-semibold color-white0">حوّل أفكارك إلى منتجات دفاعيّة</p>
              <div className="tags_list">
                <Tag name="KFUPM" color="green"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="title">
            <h5 className="color-accent">Browse Tags</h5>
            <div>
              <p className="text-12-medium color-accent">see more</p>
              <svg className="fillcolor-accent" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#5f6368"><path d="M412-480 284-658q-14-19.68-3-40.84Q292-720 316.06-720q9.62 0 18.28 4 8.66 4 13.66 12l160 224-160 224q-4.85 7.53-13.58 11.76Q325.7-240 316-240q-24 0-35-21.16t3-40.84l128-178Zm212 0L497-658q-14-19.68-3-40.84Q505-720 529.14-720q9.65 0 18.34 4.5T561-703l159 223-159 224q-4.85 7.53-13.58 11.76Q538.7-240 529-240q-24 0-35-21.16t3-40.84l127-178Z"/></svg>
            </div>
        </div>
        <div className="grid_wrapper">
          <div className="grid_item" style={{backgroundImage: "url(/download.png)", backgroundSize: "cover"}}></div>
          <div className="grid_item" style={{backgroundImage: "url(/download.png)", backgroundSize: "cover"}}></div>
          <div className="grid_item" style={{backgroundImage: "url(/download.png)", backgroundSize: "cover"}}></div>
          <div className="grid_item" style={{backgroundImage: "url(/download.png)", backgroundSize: "cover"}}></div>
          <div className="grid_item" style={{backgroundImage: "url(/download.png)", backgroundSize: "cover"}}></div>
          <div className="grid_item" style={{backgroundImage: "url(/download.png)", backgroundSize: "cover"}}></div>
          <div className="grid_item" style={{backgroundImage: "url(/download.png)", backgroundSize: "cover"}}></div>
        </div>
      </div>
    </div>
  )
}

export default DiscoverPage