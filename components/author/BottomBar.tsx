'use client'
import React, { useState } from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"


function BottomBar() {
    const [current, setCurrent] = useState<number>(3)
    return (
        <Pagination className='text-[#4d7cb4] font-orienta font-[400] text-[20px]'>
            <PaginationContent>
                <PaginationItem className='border-3 rounded-[5px] px-2'>
                    <PaginationLink href="#">First</PaginationLink>
                </PaginationItem>
                <PaginationItem className='border-3 rounded-[5px]'>
                    <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem className={`${current === 1 ? 'bg-[#2656fe] text-white border-[#2656fe] border-3 rounded-[5px]' : 'border-3 rounded-[5px]'} `} onClick={() => setCurrent(1)}>
                    <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem className={`${current === 2 ? 'bg-[#2656fe] text-white border-[#2656fe] border-3 rounded-[5px]' : 'border-3 rounded-[5px]'} `} onClick={() => setCurrent(2)} >
                    <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem className={`${current === 3 ? 'bg-[#2656fe] text-white border-[#2656fe] border-3 rounded-[5px]' : 'border-3 rounded-[5px]'} `} onClick={() => setCurrent(3)}>
                    <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem className='border-3 rounded-[5px]'>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem className='border-3 rounded-[5px]'>
                    <PaginationNext href="#" />
                </PaginationItem>
                <PaginationItem className='border-3 rounded-[5px] px-2'>
                    <PaginationLink href="#">Last</PaginationLink>
                </PaginationItem>
            </PaginationContent>
        </Pagination>

    )
}

export default BottomBar