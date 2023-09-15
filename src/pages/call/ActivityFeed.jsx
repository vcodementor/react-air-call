import React from 'react';
import { useState, useEffect } from "react";

import ActivityFeedCard from '../../components/ActivityFeedCard';
import { Tabs, Tab } from '../../components/Tabs';
import moment from"moment";
import { useNavigate} from 'react-router-dom';

const ActivityFeed = () => {
  const [callActivities, setCallActivities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://cerulean-marlin-wig.cyclic.app/activities")
      .then((res) => res.json())
      .then((json) => {
        const dateIndexedCallActivities  = {};
        json.reduce((acc, callActivity) => {
            const date = moment(callActivity.created_at).format("YYYY-MM-DD");
            (acc[date] = acc[date] || []).push(callActivity);
            return acc;
          },dateIndexedCallActivities);
        setCallActivities(dateIndexedCallActivities);
      });
  }, []);
  
  const archiveAllActivities  = () => {
    // Object.entries(callActivities).map(([date,CallActivity]) =>  {
    //   let callActivityId = CallActivity.id;
    //   fetch(`https://cerulean-marlin-wig.cyclic.app/activities/${callActivityId}`,{
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json"
    //     },
    //     method: "PATCH",	
    //     body: JSON.stringify({
    //       'is_archived': true
    //     })
    //   })
    //   .then((res) => res.json())
    //   .then((json) => {
    //   });
    // });
    navigate(`/`);
  }

  const unArchiveAllActivities = () => {
    // Object.entries(callActivities).map(([date,CallActivity]) =>  {
    //   let callActivityId = CallActivity.id;
    //   fetch(`https://cerulean-marlin-wig.cyclic.app/activities/${callActivityId}`,{
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json"
    //     },
    //     method: "PATCH",	
    //     body: JSON.stringify({
    //       'is_archived': false
    //     })
    //   })
    //   .then((res) => res.json())
    //   .then((json) => {
    //   });
    // });
            navigate(`/`);
  }

  return (
    <div>
      <Tabs>
        <Tab label="Inbox">
          <button className="sticky top-24 w-full bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded text-center"
            onClick={() => archiveAllActivities()}>
            Archive
          </button> 
          <div className='container-view'>
            { Object.entries(callActivities).map(([date,dateCallActivities]) =>  (
                <div key={date}>
                  <div className='text-center p-4'>{moment(date).format("MMMM, DD YYYY")}</div>
                  {Object.entries(dateCallActivities).map(([key,dateCallActivity]) => (
                    !dateCallActivity.is_archived ? 
                    <ActivityFeedCard callActivity={dateCallActivity}></ActivityFeedCard> : ''
                  
                ))}
                </div>
            ))}
          </div>

        </Tab>
        <Tab label="All Call">
          <div className='container-view'>
          { Object.entries(callActivities).map(([date,dateCallActivities]) =>  (
                <div key={date}>
                  <div className='text-center p-4'>{moment(date).format("MMMM, DD YYYY")}</div>
                  {Object.entries(dateCallActivities).map(([key,dateCallActivity]) => (                      
                    <ActivityFeedCard callActivity={dateCallActivity}></ActivityFeedCard>
                  ))}
                </div>
            ))}
          </div>
        </Tab>
        <Tab label="Archive Call">
          <button className="sticky top-24 w-full bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded text-center"
              onClick={() => unArchiveAllActivities()}>
              UnArchive All
          </button> 
          <div className='container-view'>
              { Object.entries(callActivities).map(([date,dateCallActivities]) =>  (
                  <div key={date}>
                    <div className='text-center p-4'>{moment(date).format("MMMM, DD YYYY")}</div>
                    {Object.entries(dateCallActivities).map(([key,dateCallActivity]) => (
                      dateCallActivity.is_archived ? 
                      <ActivityFeedCard callActivity={dateCallActivity}></ActivityFeedCard> : ''
                    
                  ))}
                  </div>
              ))}
          </div>
        </Tab>
      </Tabs>
     
    </div>
  );
};

export default ActivityFeed;
