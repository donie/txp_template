@echo off
set script_type=autogen
set cwd=%~pd0
set toolkit_path=c:\exDev\exVim\toolkit
set lang_type=unknown
set vimfiles_path=_vimfiles_gaia
set file_filter=
set file_filter_pattern=""
set cscope_file_filter=
set cscope_file_filter_pattern=""
set dir_filter=
set support_filenamelist=true
set support_ctags=false
set support_symbol=false
set support_inherit=false
set support_cscope=false
set support_idutils=true
set ctags_cmd=ctags
set ctags_options= --fields=+iaS --extra=+q --languages= --langmap=
if exist .\%vimfiles_path%\quick_gen_project_pre_custom.bat (
    call .\%vimfiles_path%\quick_gen_project_pre_custom.bat
)
call "%toolkit_path%\quickgen\batch\quick_gen_project.bat" %1
if exist .\%vimfiles_path%\quick_gen_project_post_custom.bat (
    call .\%vimfiles_path%\quick_gen_project_post_custom.bat
)
echo on
