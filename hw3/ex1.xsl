<?xml version="1.0" encoding="utf-8" ?> 
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"> 
<xsl:template match="/">
    <xsl:apply-templates select="ProductSearch"/>
</xsl:template>
<xsl:template match="ProductSearch">
    <table>
        <tr>
            <th>ProductName</th>
            <th>Price</th>
            <th>DescriptionPage</th>
        </tr>
        <!-- <xsl:apply-templates select="產品">
            <xsl:sort select="品名"/>
        </xsl:apply-templates>        -->
        <xsl:for-each select="Product">
            <xsl:sort select="ProductName"/>
            <tr>
                <td><xsl:value-of select="ProductName"/></td>
                <td><xsl:value-of select="Price"/></td>
                <td><a href="{DescriptionPage/@URL}"><xsl:value-of select="DescriptionPage"/></a></td>
            </tr>
        </xsl:for-each>
    </table>
</xsl:template>
</xsl:stylesheet>