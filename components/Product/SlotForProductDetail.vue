<template>
    <fragment>
        <slot name="pDetails"></slot>
        <p>test</p>
    </fragment>
</template>

<!--
    cara pke slot; page ini itu anaknya 
    jadi gni slot itu bkn bnr" kyk component, misalnya mw nampilin yg pDetails dari detailProducts.vue
    jadi nnti codingan yg ada di detailProducts.vue anggepannya bkl di tampilin disni
    trs abis seluruh data/ tag" an html dri detailProduct.vue nya ditampilin bkl diliat lgi di file ini
    msh ada sesuatu yg hrs di tampilin ga? oh ada si "test" yg di line 4. Nah nnti jadinya itu abis semua yg dri pDetails
    ditampilin, si "test" nya bkl di tampilin jg (jadi ada di plg bwh)

    jadi tuh kyk fungsi lainnya cth, misalnya navbar nya di jadiin slot trs misal di navbar itu mau ditambahin searchbar
    tpi gmw di semua page yang pke navbar itu cmn mw di user list page gtu misalnya. Nah bisa pke ini, nnti disini
    di tmbhin di bwh nya <slot></slot> ada searchbar gtu, ya kira" bgtu lah
-->
