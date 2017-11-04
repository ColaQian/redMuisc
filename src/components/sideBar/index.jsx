import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import SideItem from '../sidebarItem/index.jsx'

import './style.styl'

class SideBar extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
      const sideItem = this.props.sideItem
      const sideTitle = this.props.sideTitle
        return (
          <div>
            <div className="nmSidebar-myMusic">
                <p className="nmSidebar-title">{sideTitle}</p>
                  {
                    sideItem.map((item,index) =>{
                      return <SideItem key={index} name={item}/>
                    })
                  }
            </div>
          </div>
        )
    }
}

export default SideBar