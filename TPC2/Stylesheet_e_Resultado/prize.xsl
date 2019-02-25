<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    
    <xsl:output method="text" indent="yes"/>
    
    <xsl:variable name="upper" select = "'ABCDEFGHIJKLMNOPQRSTUVWXYZ'"/>
    <xsl:variable name="lower" select = "'abcdefghijklmnopqrstuvwzyz'"/>
    
    <xsl:template match="/">
        <xsl:apply-templates select="prizes/*"/>
        <xsl:apply-templates select="//laureates"/>
    </xsl:template>
    
    <xsl:template match="/prizes/*">
        <xsl:variable name="value">
            <xsl:value-of select="category"/>
        </xsl:variable>
        <xsl:variable name="count">
            <xsl:number/>
        </xsl:variable>
        <xsl:variable name= "ufirstChar" select="translate(substring($value,1,1),$lower,$upper)"/>
        <xsl:variable name="idprize" select="concat('prize',$count)"/>
###  http://www.prc.di.uminho.pt/2019/prizes#<xsl:value-of select="$idprize"/>
:<xsl:value-of select="$idprize"/> rdf:type owl:NamedIndividual,
                   :Prize;
          :category "<xsl:value-of select="concat($ufirstChar,substring($value,2))"/>";
        <xsl:if test="overallMotivation"> 
          :overallMotivation <xsl:value-of select="overallMotivation"/>;
           </xsl:if> 
           <xsl:if test="not(overallMotivation)"> 
               :overallMotivation "";
           </xsl:if> 
          :year  <xsl:value-of select="year"/>.
               <xsl:for-each select="laureates">
          :<xsl:value-of select="$idprize"/> :hasAutor :<xsl:value-of select="id"/>.
               </xsl:for-each>
    </xsl:template>
    
    <xsl:template match="laureates">
            :<xsl:value-of select="id"/> rdf:type owl:NamedIndividual ,
                    :Laureate ;
            :firstname "<xsl:value-of select="firstname"/>";
            :surname "<xsl:value-of select="surname"/>";
        <xsl:if test="motivation"> 
            :motivation <xsl:value-of select="motivation"/>;
        </xsl:if> 
        <xsl:if test="not(motivation)"> 
            :motivation "";
        </xsl:if> 
            :share <xsl:value-of select="share"/>.
    </xsl:template>

    

</xsl:stylesheet>