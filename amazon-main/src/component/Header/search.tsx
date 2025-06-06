'use client'
import {  Button, Input, Select } from 'antd';
import { listDesrAllHeader } from './Root';
import { SearchOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Search() {
  const [search,setSearch] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    router.push(`/search-product?name=${search}`) // string literal
  }, [search])

  const router = useRouter();
  return (
    <form className='flex items-center' id='select__header'>
        <Select
      defaultValue="All"
      style={{ width: 120}}
      
      options={listDesrAllHeader}
    />
  <Input  onChange={onChange}/>
   
    <Button  onClick={()=>{
      if(search){
         router.push(`/search-product?name=${search}`) // string literal
      }
    }}><SearchOutlined /></Button>
    </form>
  )
}
