USE [MobilePlanDB]
GO

/****** Object:  Table [dbo].[MobilePlans]    Script Date: 4/16/2020 2:53:29 PM ******/
DROP TABLE [dbo].[MobilePlans]
GO

/****** Object:  Table [dbo].[MobilePlans]    Script Date: 4/16/2020 2:53:29 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[MobilePlans](
	[Id] [int] NOT NULL PRIMARY KEY Identity(1,1),
	[Name] [varchar](50) NOT NULL,
	[PlanTypeId] [int] NULL,
	[Amount] [int] NULL,
	[Validity] [datetime] NULL,
	[IsActive] [bit] NULL,
	[Data] [int] NULL,
	[DataMesurementUnit] [varchar](50) NULL,
	[TalkTime] [decimal](4, 2) NULL,
	[TalkTimeValidity] [datetime] NULL,
	[DataValidity] [datetime] NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedDate] [datetime] NULL

	CONSTRAINT [FK_MobilePlans_PlanTypeId] FOREIGN KEY ([PlanTypeId]) REFERENCES [dbo].[PlanTypes]([Id])
) ON [PRIMARY]
 
GO



