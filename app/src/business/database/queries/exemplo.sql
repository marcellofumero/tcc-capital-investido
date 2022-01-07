--#selectExemplo#
  select
    *
  from
    exemplo
  where
    id = @id
--END#selectExemplo#

--#insertExemplo#
  INSERT exemplo
           ([param]
           ,[dataCadastro]
           ,[userCadastro])
     VALUES
           (@param
           ,GETDATE()
           ,@Usuario)
--END#insertExemplo#
