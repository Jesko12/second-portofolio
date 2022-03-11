import React from "react";
import { sidebarData } from "../data/sidebarData";
import SidebarMenu from "../common/sidebarMenu";
import { Monsieur, SidebarNav, SidebarWrap } from "./SidebarElements";

const Memoji = require("../../assets/images/memoji.png");

const Sidebar = ({ user, clicked }) => (
  <SidebarNav clicked={clicked}>
    <SidebarWrap>
      <Monsieur>
        <img
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "30px",
          }}
          src={Memoji.default}
          alt="Memoji"
        />
        <p>{user["FirstName"]}</p>
        {/*<img src={monsieurLogo.default} alt="Monsieur" />*/}
      </Monsieur>
      {sidebarData.map((item) => {
        return <SidebarMenu item={item} key={item.title} />;
      })}
    </SidebarWrap>
  </SidebarNav>
);

export default Sidebar;
