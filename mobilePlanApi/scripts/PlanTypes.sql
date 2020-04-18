USE [MobilePlanDB]
GO

/****** Object:  Table [dbo].[PlanTypes]    Script Date: 4/16/2020 2:53:01 PM ******/
DROP TABLE [dbo].[PlanTypes]
GO

/****** Object:  Table [dbo].[PlanTypes]    Script Date: 4/16/2020 2:53:01 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[PlanTypes](
	[Id] [int] NOT NULL  PRIMARY KEY Identity(1,1),
	[Type] [varchar](50) NULL,
	[Description] [varbinary](200) NULL
) ON [PRIMARY]
GO


