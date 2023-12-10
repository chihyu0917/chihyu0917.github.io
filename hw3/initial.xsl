<?xml version="1.0" encoding="utf-8" ?> 
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"> 
<xsl:template match="/">
    <xsl:apply-templates select="TotalRanking"/>
</xsl:template>
<xsl:template match="TotalRanking">
    <table>
        <tr>
            <th>Country</th>
            <th>Name</th>
            <th>Initial</th>
            <th>FirstRank</th>
            <th>FinalRank</th>
        </tr>
        <xsl:for-each select="Ranking">
            <xsl:sort select="Initial"/>
            <tr>
                <td><xsl:value-of select="Country"/></td>
                <td><xsl:value-of select="Name"/></td>
                <td><xsl:value-of select="Initial"/></td>
                <td><xsl:value-of select="FirstRank"/></td>
                <td><xsl:value-of select="FinalRank"/></td>
                <td><a href="{Now/@URL}"><xsl:value-of select="Now"/></a></td>
            </tr>
        </xsl:for-each>
    </table>
</xsl:template>
</xsl:stylesheet>