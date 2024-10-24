'use client';


import axios from "axios";
import React, { useEffect, useState } from "react";
import { IconReload, IconSearch } from "@tabler/icons-react";
import { Input } from "./components/Form.component";
import { cn } from "./lib/utils";



interface CONFIG {
  drone_id: string;
  drone_name: string;
  light: boolean;
  max_speed: number;
  country: string;
  population: number;
}

interface SEARCH_FORM {
  droneId?: string;
}

export default function Page() {
  const [configsData, setConfigsData] = useState<CONFIG[]>([]);
  const [reload, setReload] = useState<boolean>(false);
  const [searchForm, setSearchForm] = useState<SEARCH_FORM>({ droneId: "" });
  const [error, setError] = useState<boolean>(false);

  const get_drone_config = async (drone_id = "65010673") => {
    try {
      // const configs = await axios.get(`http://localhost:8000/configs/${drone_id}`, { headers: { 'Content-Type': 'application/json' } });
      const configs = await axios.get(`https://65010673-drone-website-server.vercel.app/configs/${drone_id}`, { headers: { 'Content-Type': 'application/json' } });

      if (configs.status === 200) {
        setError(false);
        // console.log(configs.data);
        setConfigsData(configs.data);
        setSearchForm({ droneId: "" });
        setReload(false);
      }

    } catch (error) {
      console.log('Error fetching configs:', error);
      setError(true);
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setConfigsData([])
    // console.log(searchForm);
    setError(false);
    get_drone_config(searchForm.droneId);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchForm({
      droneId: e.target.value
    });
  }

  useEffect(() => {
    get_drone_config();
  }, [reload]);

  return (
    <>
      <div className="flex flex-row justify-between flex-wrap gap-4">
        <div className="flex flex-row gap-10 justify-start items-center">
          <div className="font-extrabold text-3xl text-white">View Config</div>
          <IconReload className={cn("mt-[6px] cursor-pointer", reload && "animate-spin")} onClick={() => { setError(false); setConfigsData([]); setSearchForm({ droneId: "" }); setReload(true); }} />
        </div>
        <form className="flex flex-row items-center gap-4" onSubmit={handleSubmit}>
          <Input
            id="droneId"
            name="droneId"
            placeholder="Search by drone Id."
            type="text"
            onChange={handleChange}
            className="w-[200px]"
            value={searchForm.droneId}
          />
          <button type="submit" className="flex items-center">
            <IconSearch className="cursor-pointer text-white" />
          </button>
        </form>
      </div>
      <div className="flex gap-2 flex-1 flex-wrap justify-center mt-8">
        {(configsData && configsData.length > 0) ? configsData.map((config) => (
          <ul
            key={config.drone_id}
            className="h-[300px] w-[300px] text-white p-4 rounded-lg bg-neutral-800 space-y-3"
          >
            <li className="text-center text-2xl text-white font-bold flex flex-col mb-9">
              {config.drone_id}
              <small className="text-[0.925rem] font-normal">{config.drone_name}</small>
            </li>
            <li className="text-white">Light Status: {config.light}</li>
            <li className="text-white">Max Speed: {config.max_speed}</li>
            <li className="text-white">Country: {config.country}</li>
            <li className="text-white">Population: {config.population}</li>
          </ul>
        )) : (error ? (
          <div className="h-[100px] text-white w-full text-2xl rounded-lg p-4 bg-neutral-800 flex justify-center items-center">
            Drone Not Found !
          </div>
        ) : (
          [...new Array(8)].map((_, index) => (
            <ul
              key={index}
              className="h-[300px] w-[300px] rounded-lg p-4 bg-neutral-800 animate-pulse space-y-3"
            ></ul>
          ))))
        }
      </div>
    </>
  );
};
