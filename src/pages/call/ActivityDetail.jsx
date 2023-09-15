import React from 'react';
import { useState, useEffect } from "react";
import { useParams ,useNavigate} from 'react-router-dom';
import {  } from "react-router-dom";
import moment from"moment";

const ActivityDetail = () => {
  const [callActivity, setCallActivity] = useState([]);
  const { callActivityId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://cerulean-marlin-wig.cyclic.app/activities/${callActivityId}`)
      .then((res) => res.json())
      .then((json) => {
        setCallActivity(json);
      });
  }, [callActivityId]);

  const handleOnClickBack = () => {
    navigate(`/`);
  };

  const archiveActivity = (callActivityId,is_archived) => {
    fetch(`https://cerulean-marlin-wig.cyclic.app/activities/${callActivityId}`,{
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "PATCH",	
      body: JSON.stringify({
        'is_archived': is_archived
      })
    })
    .then((res) => res.json())
    .then((json) => {

    });
    handleOnClickBack();
  };

  return (
    <div className="container-view">
      <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded text-center" onClick={handleOnClickBack}>
        &lt; Back
      </button>
            {
                callActivity ? 
                  <div className="p-4 justify-center block shadow rounded-lg">
                    <div className='py-2'>ID :- {callActivity.id}</div>
                    <div className='py-2'> Created at :- {moment(callActivity.created_at, 'YYYY-MM-DD').format('LL')} </div>
                    <div className='py-2'> Direction :- {callActivity.direction} </div>
                    <div className='py-2'> From :- {callActivity.from} </div>
                    <div className='py-2'> To:- {callActivity.to} </div>
                    <div className='py-2'> Via:- {callActivity.via} </div>
                    <div className='py-2'> Duration (s):- {callActivity.duration} </div>
                    <div className='py-2'> Archived:- {callActivity.is_archived ? 'yes' : 'no'} </div>
                    <div className='py-2'> Call type:- {callActivity.call_type} </div>
                    <button
                        className="my-4 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded text-center"
                        onClick={() => archiveActivity(callActivity.id,!callActivity.is_archived)}>
                        {callActivity.is_archived ? 'UnArchive' : 'Archive' }
                    </button> 
                  </div>
                : `Activity ${callActivityId} not found`
            }
        </div>
  )
};

export default ActivityDetail;
