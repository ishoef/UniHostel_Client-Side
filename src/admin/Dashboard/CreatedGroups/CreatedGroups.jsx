import React, { useEffect } from "react";
import GroupTableRow from "../../../Components/GroupTableRow/GroupTableRow";

const CreatedGroups = ({ groups, setGroups, buttonShow, title }) => {
  useEffect(() => {
    document.title = "My Groups | Hobby Shop";
  }, []);

  return (
    <div className="mx-auto">
      <h1 className="title">
        {title} ({groups ? groups.length : 0})
      </h1>
      <div className="overflow-x-auto min-h-[calc(100vh-438px)]">
        <table className="table table-lg border border-[#FF6B3580] dark:border-primary/20 rounded-2xl">
          <thead>
            <tr className="bg-primary dark:bg-gray-800 text-white text-[18px]">
              <th>Image</th>
              <th>Group Name</th>
              <th>Category</th>
              <th>Members</th>
              <th>Location</th>
              <th>Start Date</th>
              {buttonShow && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {groups.map((group) => (
              <GroupTableRow
                buttonShow={buttonShow}
                groups={groups}
                setGroups={setGroups}
                key={group._id}
                group={group}
              ></GroupTableRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreatedGroups;
