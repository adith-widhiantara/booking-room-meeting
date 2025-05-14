<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class CreateDatabaseSqlite extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:database-sqlite {name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $name = $this->argument('name');
        $path = database_path($name.'.sqlite');

        if (file_exists($path)) {
            $this->error("Database file already exists at {$path}");

            return;
        }

        file_put_contents($path, '');
        $this->info("Database file created at {$path}");
    }
}
