import React from 'react';
import "./featuredInfo.css";
import {BiUpArrowAlt, BiDownArrowAlt} from "react-icons/bi";

export default function FeaturedInfo() {
  return (
    <div className='featured'>
        <div className="featuredItem">
<span className="featuredTitle">Revanue</span>
<div className="featuredMoneyContainer">
<span className="featuredMoney">$2,415</span>
<span className="featuredMoneyRate">$-11,4 <BiDownArrowAlt /> </span>
</div>
<span className="featuredSub">Compare to last month </span>

      </div>
      <div className="featuredItem">
<span className="featuredTitle">Sales</span>
<div className="featuredMoneyContainer">
<span className="featuredMoney">$4,415</span>
<span className="featuredMoneyRate">$-1,4 <BiDownArrowAlt /> </span>
</div>
<span className="featuredSub">Compare to last month </span>

      </div>
      <div className="featuredItem">
<span className="featuredTitle">Cost</span>
<div className="featuredMoneyContainer">
<span className="featuredMoney">$2,225</span>
<span className="featuredMoneyRate">$+2,4 <BiUpArrowAlt /> </span>
</div>
<span className="featuredSub">Compare to last month </span>

      </div>
    </div>
  )
}
