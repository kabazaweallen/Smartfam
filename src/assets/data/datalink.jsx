import {FaUser,} from 'react-icons/fa'
import { GoPaste } from "react-icons/go";
import { PiBridgeThin } from "react-icons/pi";
import { GiCow } from "react-icons/gi";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { TbReportMoney } from "react-icons/tb";
import { HiOutlineUsers } from "react-icons/hi2";
import { SlCalender } from "react-icons/sl";
import { FaRegUser } from "react-icons/fa";
export const links=[
    {
        id:1,
        name:"Cattles",
        icon:<GiCow/>
    },
    {
        id:3,
        name:"Activities",
        icon:<GoPaste />
        
    },
    {
        id:14,
        name:"users",
        icon:<HiOutlineUsers />
        
    },
    
    {
        id:6,
        name:"Pasture",
            icon:<PiBridgeThin />,
    },
    // {
    //     id:7,
    //     name:"Group",
    //         icon:<HiOutlineUsers />,
    // },
    {
        id:9,
        name:"Financial ",
        icon:<TbReportMoney/>

    
    },
    {
        id:10,
        name:"Report",
            icon:<HiOutlineDocumentReport/>,
    
    },
    // {
    //     id:190,
    //     name:"History",
    //         icon:<SlCalender />,
    
    // },
    {
        id:12,
        name:"Profile",
            icon:<FaRegUser/>,
    
    },
    
    ]

    export  const  cows = [
        {
id:1,
name:'inyambo',
type:'bull',
status:'pregnant',
eartag:4579,
life:'active'
    },
    {
        id:2,
        name:'inyambo',
        type:'bull',
        status:'pregnant',
        eartag:4579,
        life:'active'
            },
            {
                id:3,
                name:'jersey',
                type:'cow',
                status:'pregnant',
                eartag:879,
                life:'active'
                    },
                    {
                        id:4,
                        name:'amaerican',
                        type:'cow',
                        status:'pregnant',
                        eartag:779,
                        life:'active'
                            },]

export const Pastures =[
    {
        'id':1,
        'name':'pasure1',
        'numbercattle':45
        
    },
    {
        'id':89,
        'name':'pasure1',
        'numbercattle':45
        
    },
    {
        'id':2,
        'name':'pasure3',
        'numbercattle':45
        
    },
    {
        'id':4,
        'name':'pasure2',
        'numbercattle':45
        
    },
]
export const accordionData = [
    {

      title: 'Section 1',
      content: [
        {
        time :'12 february',
        content1: `Dead Activity`,
        subcontent:[
            {
                saleDate:'12 march',
                soldTo:"Gedeon",
                salePrice:'2000'
            }
        ]
        },
        {
        time :'27 March',
        content1: `Sale Activity`,
        subcontent:[
            {
                saleDate:'30 june',
                soldTo:"Gedeon",
                salePrice:'2000'
            }
        ]
        },
              
    ]
      
    },
    // {
    //   title: 'Section 2',
    //   content: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia veniam
    //   reprehenderit nam assumenda voluptatem ut. Ipsum eius dicta, officiis
    //   quaerat iure quos dolorum accusantium ducimus in illum vero commodi
    //   pariatur? Impedit autem esse nostrum quasi, fugiat a aut error cumque
    //   quidem maiores doloremque est numquam praesentium eos voluptatem amet!
    //   Repudiandae, mollitia id reprehenderit a ab odit!`
    // },
    // {
    //   title: 'Section 3',
    //   content: `Sapiente expedita hic obcaecati, laboriosam similique omnis architecto ducimus magnam accusantium corrupti
    //   quam sint dolore pariatur perspiciatis, necessitatibus rem vel dignissimos
    //   dolor ut sequi minus iste? Quas?`
    // }
  ];