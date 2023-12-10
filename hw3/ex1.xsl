<?xml version="1.0" encoding="utf-8" ?> 
<xsl:stylesheet xmlns:xsl="http://www.w3.org/TR/WD-xsl"> 
<xsl:template match="/">
    <xsl:apply-templates select="產品搜尋"/>
</xsl:template>
<xsl:template match="產品搜尋">
    <table>
        <tr>
            <th>品名</th>
            <th>定價</th>
            <th>說明頁</th>
        </tr>
    <xsl:for-each select="產品">
        <xsl:sort select="品名"/>
        <tr>
            <td><xsl:value-of select="品名"/></td>
            <td><xsl:value-of select="定價"/></td>
            <td><a href="{說明頁/@網址}"><xsl:value-of select="說明頁"/></a></td>
        </tr>
    </xsl:for-each>
    </table>
</xsl:template>
</xsl:stylesheet>