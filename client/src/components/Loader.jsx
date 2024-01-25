import React from "react";
import { LoadingOutlined } from '@ant-design/icons';

import { Spin } from "antd";

function Loader() {
  return (
    <div className="fixed inset-0 flex justify-center bg-black items-center opacity-40">
          <Spin
    indicator={
      <LoadingOutlined
        style={{
          fontSize: 34,
          color: 'white'
        }}
        spin
      />
    }
  />
    </div>
  );
}

export default Loader;
