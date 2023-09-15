import React from 'react';
import moment from"moment";

import InboundCall from '../components/InboundCall.jsx';
import OutboundCall from '../components/OutboundCall.jsx';
import UnknownCall from '../components/UnknownCall.jsx';
import { useNavigate } from "react-router-dom";

const ActivityFeedCard = (callActivity) => {
  callActivity = callActivity.callActivity;
  const navigate = useNavigate();
  
  const handleCallOnClick = (callId) => {
    navigate(`/activities/${callId}`);
  };

  const buildDirectionIcon = (direction) => {
    switch (direction) {
        case "inbound":
            return <InboundCall/>
        case "outbound":
            return <OutboundCall/>
        default:
            return  <UnknownCall/>
    }
  }

  return (
    <>
      <div className="flex flex-row border shadow rounded-xl py-4 m-2 items-center cursor-pointer" onClick={() => handleCallOnClick(callActivity.id)}>
        <div className="flex flex-row justify-center items-center mx-4">
          { buildDirectionIcon(callActivity.direction) }
        </div>
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex flex-col">
            <span className="call-activity-card-from">{ callActivity.from }</span>
            <span className="call-activity-card-target">
            tried to call on { callActivity.to }
            </span>
          </div>
          <span className="flex flex-row justify-center items-center">{moment(callActivity.created_at,'YYYY-MM-DD').format('hh:mm A')}</span>
        </div>
      </div>
    </>
  );
};

export default ActivityFeedCard;