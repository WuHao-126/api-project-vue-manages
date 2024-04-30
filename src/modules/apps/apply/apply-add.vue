<template>
    <a-table :columns="columns" :data-source="data">

    </a-table>
</template>
<script>
    const columns = [
        {
            title: '接口名称',
            dataIndex: 'name',
            key: 'name',
            align:"center"
        },
        {
            title: '申请用户名称',
            dataIndex: 'userName',
            key: 'userName',
            align:"center"
        },
        {
            title: '申请状态',
            dataIndex: 'state',
            key: 'state',
            align:"center"
        },
        {
            title: '预算（元）',
            dataIndex: 'budget',
            key: 'budget',
            align:"center"
        },
        {
            title: '业务需求描述',
            key: 'demandDescription',
            dataIndex: 'demandDescription',
            align:"center",
            ellipsis:true
        },
        {
            title: '功能需求描述',
            key: 'functionDescription',
            dataIndex: 'functionDescription',
            ellipsis:true,
            align:"center"
        },
        {
            title: '技术要求和限制',
            key: 'technologyDescription',
            dataIndex: 'technologyDescription',
            ellipsis:true,
            align:"center"
        },
        {
            title: '创建时间',
            key: 'createDate',
            dataIndex: 'createDate',
            align:"center"
        },
        {
            title: '操作',
            key: 'action',
            scopedSlots: { customRender: 'action' },
            align:"center"
        },
    ];

    export default {
        data() {
            return {
                data,
                columns,
            };
        },
    };
</script>