To create a new Migration execute the following command in the console:
	Add-Migration -Name Migration_Name -Project CLN.services -StartupProject CLN.api -Context CLNContext -Verbose

To update the DataBase execute the following command in the console:
	Update-Database -Project CLN.services -StartupProject CLN.api -Context CLNContext -Verbose

To remove a migration (not runned) execute the following command in the console:
	Remove-Migration -Project CLN.services -StartupProject CLN.api -Context CLNContext -Verbose

To undo an already runned execute migration follow this steps:
	1. Update the DataBase to the previous migration
		Update-Database -Migration Migration_Name -Project CLN.services -StartupProject CLN.api -Context CLNContext -Verbose
	2. Remove the latest migrations:
		Remove-Migration -Project CLN.services -StartupProject CLN.api -Context CLNContext -Verbose



 To Scaffold from database:
	Scaffold-DbContext -Connection Name=ConnectionStrings:clnDatabase -Project CLN.model -Context CLNScaffoldDbContext -StartupProject CLN.api -ContextDir Context -OutputDir Models -Provider Microsoft.EntityFrameworkCore.SqlServer

 To Update Scaffold from database:
	Scaffold-DbContext -Connection Name=ConnectionStrings:clnDatabase -Project CLN.model -Context CLNScaffoldDbContext -StartupProject CLN.api -ContextDir Context -OutputDir Models -Provider Microsoft.EntityFrameworkCore.SqlServer -Force