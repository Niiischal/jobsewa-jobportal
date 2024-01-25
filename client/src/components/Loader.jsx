import React from "react";
import { LoadingOutlined } from '@ant-design/icons';

import { Spin } from "antd";

function Loader() {
  return (
    <div className="fixed inset-0 flex justify-center items-center">
          <Spin
    indicator={
      <LoadingOutlined
        style={{
          fontSize: 44,
        }}
        spin
      />
    }
  />
    </div>
  );
}

export default Loader;
