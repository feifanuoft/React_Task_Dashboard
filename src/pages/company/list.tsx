import CustomAvatar from '@/components/custom-avatar';
import { COMPANIES_LIST_QUERY } from '@/graphql/queries';
import { SearchOutlined } from '@ant-design/icons';
import { CreateButton, DeleteButton, EditButton, FilterDropdown, List, useTable } from '@refinedev/antd'
import { getDefaultFilter, useGo } from '@refinedev/core';
import { Input, Space, Table } from 'antd';
import Search from 'antd/es/transfer/search';
import {Text} from "/Users/lifeifan/stale-sloths-sleep/src/components/text"
import { Company } from '@/graphql/schema.types';
import { currencyNumber } from '@/utilities';

const CompanyList = () => {
  const go = useGo();
  const {tableProps, filters} = useTable({
    resource:'companies',
    pagination:{
      pageSize:12,
    },
    meta:{
      gqlQuery:COMPANIES_LIST_QUERY
    }
  })
  
  return (
    <List
    breadcrumb = {false}
    headerButtons = {()=>
    (
      <CreateButton       
      onClick={()=>{
        go(
          {
            to:{
              resource:'companies',
              action:'create'
            },
            options:{
              keepQuery:true
            },
            type:"replace"
          }
        )
      }}/>

    )
    }>
      <Table
      {...tableProps}
      pagination={{
        ...tableProps.pagination,
      }
      }
      >
        <Table.Column<Company>
        dataIndex='name'
        title = "Company Title"
        defaultFilteredValue={getDefaultFilter("id", filters)}
        filterIcon = {<SearchOutlined/>}
        filterDropdown = {(props) =>(
          <FilterDropdown {...props}>
            <Input placeholder = "Search Company"/>
          </FilterDropdown>
        )}
        render={(value, record) =>(
          <Space>
            <CustomAvatar shape = "square" name={record.name} src = {record.avatarUrl}/>
            <Text style = {{whiteSpace:'nowrap'}}>
              {record.name}

            </Text>
          </Space>
        )}/>

        <Table.Column<Company>
        dataIndex = "totalRevenue"
        title = "Open detail amount"
        render = {(value, company) => (
          <Text>
            {currencyNumber(company?.dealsAggregate?.[0].sum?.value ||0)}
          </Text>
        )} />

        <Table.Column<Company>
        dataIndex = "id"
        title = "Actions"
        fixed = "right"
        render = {(value) => (
          <Space>
            <EditButton hideText size ="small" recordItemId={value}/>
            <DeleteButton hideText size ="small" recordItemId={value}/>
          </Space>
        )} />
      </Table>
    </List>
  )
}

export default CompanyList



