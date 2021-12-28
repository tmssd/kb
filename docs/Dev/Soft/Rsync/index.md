# Rsync

This puts folder A into folder B:

    rsync -avu --delete "/home/user/A" "/home/user/B"

If you want the **contents of folders A and B** to be the same, put `/home/user/A/` (with the slash) as the source. This takes not the folder A but all of it's content and puts it into folder B. Like this:

    rsync -avu --delete "/home/user/A/" "/home/user/B"


- `-a` Do the sync preserving all filesystem attributes
- `-v` run verbosely
- `-u` only copy files with a newer modification time (or size difference if the times are equal)
- `--delete` delete the files in target folder that do not exist in the source

Manpage: https://download.samba.org/pub/rsync/rsync.html


Rsync is primarly meant to copy files between different computers, as explained here it can serve the purpose to sync directories as well. So the -z option is interesting to reduce network traffic and thus enhance the performance of an rsync between 2 computers: ( read data from disk -> compress) ===network===> (uncompress->write to disk) Using -z to sync 2 directories on the same host is a bit silly and waste of cpu cycles as you would get (read data from disk -> compress -> uncompress -> write to disk)


! If you use an absolute path in a filter (include/exclude), it's interpreted starting from the root of the synchronization. You aren't excluding a directory in the source, or a excluding a directory in the destination, you're excluding a directory in the tree to synchronize.

Thus:

    rsync -av --delete --progress --exclude "/folder4/mytestfolder1" /source/ /destination/


My Config:

First Sync from external SSD to PC:

    sudo rsync -rv "/run/media/tms/tsdata/linux/" "/home/tms"
